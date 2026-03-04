import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import type {
  ClassNote,
  NoteBlock,
  CodeLanguage,
} from '@/components/ClassNotes/types'
import type {
  Root,
  RootContent,
  Code,
  Paragraph,
  Heading,
  List,
  ListItem,
  PhrasingContent,
} from 'mdast'

const NOTES_DIRECTORY = path.join(process.cwd(), 'content/notes')

interface NoteFrontmatter {
  id: string
  title: string
  category: string
  order?: number
}

function phrasingToHtml(nodes: PhrasingContent[]): string {
  return nodes
    .map((node) => {
      switch (node.type) {
        case 'text':
          return node.value
        case 'strong':
          return `<strong>${phrasingToHtml(node.children)}</strong>`
        case 'emphasis':
          return `<em>${phrasingToHtml(node.children)}</em>`
        case 'inlineCode':
          return `<code>${node.value}</code>`
        case 'link':
          return `<a href="${node.url}">${phrasingToHtml(node.children)}</a>`
        case 'break':
          return '<br/>'
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

function headingToHtml(heading: Heading): string {
  const tag = `h${heading.depth}`
  const content = phrasingToHtml(heading.children)
  return `<${tag}>${content}</${tag}>`
}

function isValidCodeLanguage(
  lang: string | null | undefined,
): lang is CodeLanguage {
  const validLanguages: CodeLanguage[] = [
    'javascript',
    'jsx',
    'typescript',
    'tsx',
    'html',
    'css',
  ]
  return validLanguages.includes(lang as CodeLanguage)
}

export function parseMarkdownToBlocks(content: string): NoteBlock[] {
  const processor = unified().use(remarkParse)
  const tree = processor.parse(content) as Root
  const blocks: NoteBlock[] = []
  let blockId = 1

  function processNode(node: RootContent): void {
    switch (node.type) {
      case 'paragraph': {
        const paragraph = node as Paragraph
        blocks.push({
          id: String(blockId++),
          type: 'text',
          content: phrasingToHtml(paragraph.children),
        })
        break
      }
      case 'code': {
        const code = node as Code
        const language = isValidCodeLanguage(code.lang)
          ? code.lang
          : 'javascript'
        blocks.push({
          id: String(blockId++),
          type: 'code',
          content: code.value,
          language,
        })
        break
      }
      case 'heading': {
        const heading = node as Heading
        blocks.push({
          id: String(blockId++),
          type: 'text',
          content: headingToHtml(heading),
        })
        break
      }
      case 'list': {
        const list = node as List
        blocks.push({
          id: String(blockId++),
          type: 'text',
          content: listToHtml(list),
        })
        break
      }
    }
  }

  tree.children.forEach(processNode)
  return blocks
}

export async function getAllNotes(): Promise<ClassNote[]> {
  if (!fs.existsSync(NOTES_DIRECTORY)) {
    return []
  }

  const fileNames = fs.readdirSync(NOTES_DIRECTORY)
  const markdownFiles = fileNames.filter((name) => name.endsWith('.md'))

  const notes: ClassNote[] = markdownFiles.map((fileName) => {
    const filePath = path.join(NOTES_DIRECTORY, fileName)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    const frontmatter = data as NoteFrontmatter

    return {
      id: frontmatter.id,
      title: frontmatter.title,
      category: frontmatter.category,
      order: frontmatter.order,
      blocks: parseMarkdownToBlocks(content),
    }
  })

  return notes.sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
}
