export type CodeLanguage =
  | 'javascript'
  | 'jsx'
  | 'typescript'
  | 'tsx'
  | 'html'
  | 'css'

export interface NoteBlock {
  id: string
  type: 'text' | 'code'
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
