export type CodeLanguage =
  'javascript' | 'jsx' | 'typescript' | 'tsx' | 'html' | 'css'

export type NoteBlock =
  | {
      id: string
      type: 'text'
      content: string
      /** `phrasing` is safe inside `<p>`. `block` is a heading, list, or table. */
      flow: 'phrasing' | 'block'
    }
  | {
      id: string
      type: 'code'
      content: string
      language?: CodeLanguage
    }

export interface ClassNote {
  id: string
  title: string
  category: string
  order?: number
  blocks: NoteBlock[]
}
