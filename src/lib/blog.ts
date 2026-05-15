import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import type {
  Root,
  RootContent,
  Code,
  Paragraph,
  Heading,
  List,
  ListItem,
  PhrasingContent,
  Table,
  TableRow,
  TableCell,
  Blockquote,
  ThematicBreak,
  Image,
} from 'mdast'

function getPostsDir(locale: 'en' | 'es' = 'en'): string {
  return path.join(process.cwd(), 'content', 'posts', locale)
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type BlogBlockType =
  | 'paragraph'
  | 'heading'
  | 'code'
  | 'blockquote'
  | 'list'
  | 'table'
  | 'divider'
  | 'image'

export interface BlogBlock {
  id: string
  type: BlogBlockType
  // paragraph / heading / blockquote / list / table — rendered as HTML string
  html?: string
  // heading depth (1–6) when type === 'heading'
  depth?: number
  // heading plain text for ToC construction
  headingText?: string
  // anchor id derived from headingText
  headingId?: string
  // code block fields
  code?: string
  language?: string
  // image fields
  src?: string
  alt?: string
}

export interface BlogPostFrontmatter {
  slug: string
  title: string
  excerpt: string
  date: string
  readingTime: number
  tags: string[]
  category: string
  coverImage: string
}

export interface BlogPostData {
  frontmatter: BlogPostFrontmatter
  blocks: BlogBlock[]
  tocHeadings: { id: string; text: string; depth: number }[]
}

// ─── Supported code languages ─────────────────────────────────────────────────

const SUPPORTED_LANGUAGES = new Set([
  'javascript',
  'js',
  'jsx',
  'typescript',
  'ts',
  'tsx',
  'html',
  'css',
  'scss',
  'bash',
  'sh',
  'shell',
  'shell-session',
  'python',
  'py',
  'yaml',
  'yml',
  'json',
  'rust',
  'go',
  'java',
  'c',
  'cpp',
  'sql',
  'markdown',
  'md',
  'text',
  'plaintext',
])

function normalizeLanguage(lang: string | null | undefined): string {
  if (!lang) return 'bash'
  const lower = lang.toLowerCase()
  if (!SUPPORTED_LANGUAGES.has(lower)) return 'bash'
  // Normalize aliases
  if (lower === 'shell' || lower === 'sh') return 'bash'
  if (lower === 'js') return 'javascript'
  if (lower === 'ts') return 'typescript'
  if (lower === 'py') return 'python'
  if (lower === 'yml') return 'yaml'
  if (lower === 'md') return 'markdown'
  if (lower === 'plaintext' || lower === 'text') return 'bash'
  return lower
}

// ─── HTML helpers ─────────────────────────────────────────────────────────────

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

function phrasingToHtml(nodes: PhrasingContent[]): string {
  return nodes
    .map((node) => {
      switch (node.type) {
        case 'text':
          return escapeHtml(node.value)
        case 'strong':
          return `<strong>${phrasingToHtml(node.children)}</strong>`
        case 'emphasis':
          return `<em>${phrasingToHtml(node.children)}</em>`
        case 'inlineCode':
          return `<code>${escapeHtml(node.value)}</code>`
        case 'link':
          return `<a href="${escapeHtml(node.url)}" target="_blank" rel="noopener noreferrer">${phrasingToHtml(node.children)}</a>`
        case 'image':
          return `<img src="${escapeHtml(node.url)}" alt="${escapeHtml(node.alt ?? '')}" />`
        case 'break':
          return '<br/>'
        case 'delete':
          return `<del>${phrasingToHtml(node.children)}</del>`
        default:
          return ''
      }
    })
    .join('')
}

function listItemToHtml(item: ListItem): string {
  return item.children
    .map((child) => {
      if (child.type === 'paragraph') {
        return phrasingToHtml((child as Paragraph).children)
      }
      if (child.type === 'list') {
        return listToHtml(child as List)
      }
      return ''
    })
    .join('')
}

function listToHtml(list: List): string {
  const tag = list.ordered ? 'ol' : 'ul'
  const items = list.children
    .map((item: ListItem) => `<li>${listItemToHtml(item)}</li>`)
    .join('')
  return `<${tag}>${items}</${tag}>`
}

function headingToText(heading: Heading): string {
  return heading.children
    .map((node) => {
      if (node.type === 'text') return node.value
      if (node.type === 'inlineCode') return node.value
      return ''
    })
    .join('')
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function tableCellToHtml(cell: TableCell, isHeader: boolean): string {
  const tag = isHeader ? 'th' : 'td'
  const content = phrasingToHtml(cell.children as PhrasingContent[])
  return `<${tag}>${content}</${tag}>`
}

function tableRowToHtml(row: TableRow, isHeader: boolean): string {
  const cells = row.children
    .map((cell) => tableCellToHtml(cell as TableCell, isHeader))
    .join('')
  return `<tr>${cells}</tr>`
}

function tableToHtml(table: Table): string {
  const rows = table.children as TableRow[]
  if (rows.length === 0) return ''
  const headerRow = tableRowToHtml(rows[0], true)
  const bodyRows = rows
    .slice(1)
    .map((row) => tableRowToHtml(row, false))
    .join('')
  return `<table><thead>${headerRow}</thead><tbody>${bodyRows}</tbody></table>`
}

function blockquoteToHtml(bq: Blockquote): string {
  const inner = bq.children
    .map((child) => {
      if (child.type === 'paragraph') {
        return `<p>${phrasingToHtml((child as Paragraph).children)}</p>`
      }
      return ''
    })
    .join('')
  return inner
}

// ─── Main parser ─────────────────────────────────────────────────────────────

export function parsePostToBlocks(content: string): {
  blocks: BlogBlock[]
  tocHeadings: BlogPostData['tocHeadings']
} {
  const processor = unified().use(remarkParse).use(remarkGfm)
  const tree = processor.parse(content) as Root
  processor.runSync(tree)

  const blocks: BlogBlock[] = []
  const tocHeadings: BlogPostData['tocHeadings'] = []
  const headingIdCount: Record<string, number> = {}
  let blockId = 1

  function makeId(): string {
    return String(blockId++)
  }

  function processNode(node: RootContent): void {
    switch (node.type) {
      case 'paragraph': {
        const para = node as Paragraph
        // Check if paragraph is a standalone image
        if (para.children.length === 1 && para.children[0].type === 'image') {
          const img = para.children[0] as Image
          blocks.push({
            id: makeId(),
            type: 'image',
            src: img.url,
            alt: img.alt ?? '',
          })
          return
        }
        const html = phrasingToHtml(para.children)
        if (html.trim()) {
          blocks.push({ id: makeId(), type: 'paragraph', html })
        }
        break
      }

      case 'heading': {
        const heading = node as Heading
        const text = headingToText(heading)
        const baseId = slugifyHeading(text)
        headingIdCount[baseId] = (headingIdCount[baseId] ?? 0) + 1
        const headingId =
          headingIdCount[baseId] > 1
            ? `${baseId}-${headingIdCount[baseId]}`
            : baseId
        const html = phrasingToHtml(heading.children)
        blocks.push({
          id: makeId(),
          type: 'heading',
          html,
          depth: heading.depth,
          headingText: text,
          headingId,
        })
        if (heading.depth <= 3) {
          tocHeadings.push({ id: headingId, text, depth: heading.depth })
        }
        break
      }

      case 'code': {
        const code = node as Code
        blocks.push({
          id: makeId(),
          type: 'code',
          code: code.value,
          language: normalizeLanguage(code.lang),
        })
        break
      }

      case 'blockquote': {
        const bq = node as Blockquote
        const html = blockquoteToHtml(bq)
        blocks.push({ id: makeId(), type: 'blockquote', html })
        break
      }

      case 'list': {
        const list = node as List
        blocks.push({ id: makeId(), type: 'list', html: listToHtml(list) })
        break
      }

      case 'table': {
        const table = node as Table
        blocks.push({
          id: makeId(),
          type: 'table',
          html: tableToHtml(table),
        })
        break
      }

      case 'thematicBreak': {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _break = node as ThematicBreak
        blocks.push({ id: makeId(), type: 'divider' })
        break
      }

      default:
        break
    }
  }

  tree.children.forEach(processNode)
  return { blocks, tocHeadings }
}

// ─── File system helpers ──────────────────────────────────────────────────────

export function getPostSlugs(locale: 'en' | 'es' = 'en'): string[] {
  const dir = getPostsDir(locale)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith('.md') && !name.startsWith('_'))
    .map((name) => {
      const fullPath = path.join(dir, name)
      const raw = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(raw)
      const fm = data as Partial<BlogPostFrontmatter>
      if (fm.slug && typeof fm.slug === 'string') return fm.slug
      return name.replace(/\.md$/i, '')
    })
}

function resolvePostFilePath(slug: string, dir: string): string | null {
  if (!fs.existsSync(dir)) return null
  const direct = path.join(dir, `${slug}.md`)
  if (fs.existsSync(direct)) return direct
  const slugLower = slug.toLowerCase()
  for (const name of fs.readdirSync(dir)) {
    if (!name.endsWith('.md') || name.startsWith('_')) continue
    const fullPath = path.join(dir, name)
    const base = name.replace(/\.md$/i, '')
    if (base.toLowerCase() === slugLower) return fullPath
    const raw = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(raw)
    const fm = data as Partial<BlogPostFrontmatter>
    if (fm.slug === slug) return fullPath
  }
  return null
}

export function getPostBySlug(
  slug: string,
  locale: 'en' | 'es' = 'en',
): BlogPostData | null {
  const filePath =
    resolvePostFilePath(slug, getPostsDir(locale)) ??
    resolvePostFilePath(slug, getPostsDir('en'))
  if (!filePath) return null

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  const frontmatter = data as BlogPostFrontmatter
  const { blocks, tocHeadings } = parsePostToBlocks(content)

  return { frontmatter, blocks, tocHeadings }
}
