'use client'
import { useState, useCallback } from 'react'
import { Highlight } from 'prism-react-renderer'
import type { PrismTheme } from 'prism-react-renderer'
import styles from './styles.module.css'

// Clean light theme that matches the notebook aesthetic
const notebookTheme: PrismTheme = {
  plain: {
    color: '#1f2937',
    backgroundColor: '#ffffff',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: { color: '#6b7280', fontStyle: 'italic' },
    },
    {
      types: ['string', 'attr-value', 'template-string'],
      style: { color: '#16a34a' },
    },
    {
      types: ['punctuation', 'operator'],
      style: { color: '#6b7280' },
    },
    {
      types: ['number', 'boolean', 'constant', 'regex', 'inserted'],
      style: { color: '#b45309' },
    },
    {
      types: ['keyword', 'atrule', 'attr-name', 'selector'],
      style: { color: '#1d4ed8' },
    },
    {
      types: ['function', 'function-variable', 'tag'],
      style: { color: '#0369a1' },
    },
    {
      types: ['class-name', 'builtin'],
      style: { color: '#7c3aed' },
    },
    {
      types: ['variable', 'symbol', 'entity', 'url', 'property'],
      style: { color: '#0f766e' },
    },
    {
      types: ['deleted'],
      style: { color: '#dc2626' },
    },
    {
      types: ['namespace'],
      style: { opacity: 0.7 },
    },
  ],
}

const darkTheme: PrismTheme = {
  plain: {
    color: '#e8e4df',
    backgroundColor: '#1a1a1a',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: { color: '#6b7565', fontStyle: 'italic' },
    },
    {
      types: ['string', 'attr-value', 'template-string'],
      style: { color: '#86c88a' },
    },
    {
      types: ['punctuation', 'operator'],
      style: { color: '#8a8580' },
    },
    {
      types: ['number', 'boolean', 'constant', 'regex', 'inserted'],
      style: { color: '#e09a50' },
    },
    {
      types: ['keyword', 'atrule', 'attr-name', 'selector'],
      style: { color: '#7baee8' },
    },
    {
      types: ['function', 'function-variable', 'tag'],
      style: { color: '#56b6c2' },
    },
    {
      types: ['class-name', 'builtin'],
      style: { color: '#c792ea' },
    },
    {
      types: ['variable', 'symbol', 'entity', 'url', 'property'],
      style: { color: '#f2df6b' },
    },
    {
      types: ['deleted'],
      style: { color: '#e06c75' },
    },
    {
      types: ['namespace'],
      style: { opacity: 0.7 },
    },
  ],
}

const LANGUAGE_LABELS: Record<string, string> = {
  javascript: 'JavaScript',
  js: 'JavaScript',
  jsx: 'JSX',
  typescript: 'TypeScript',
  ts: 'TypeScript',
  tsx: 'TSX',
  html: 'HTML',
  css: 'CSS',
  scss: 'SCSS',
  bash: 'Bash',
  'shell-session': 'Shell',
  python: 'Python',
  yaml: 'YAML',
  json: 'JSON',
  rust: 'Rust',
  go: 'Go',
  java: 'Java',
  c: 'C',
  cpp: 'C++',
  sql: 'SQL',
  markdown: 'Markdown',
}

interface CodeBlockProps {
  code: string
  language: string
  filename?: string
  isDark?: boolean
}

export default function CodeBlock({
  code,
  language,
  filename,
  isDark,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // silent fail
    }
  }, [code])

  const label = filename ?? LANGUAGE_LABELS[language] ?? language.toUpperCase()
  const highlightLang = language === 'shell-session' ? 'bash' : language
  const activeTheme = isDark ? darkTheme : notebookTheme

  return (
    <div className={`${styles.wrapper} ${isDark ? styles.darkWrapper : ''}`}>
      <div className={styles.header}>
        <span className={styles.filename}>{label}</span>
        <button
          onClick={handleCopy}
          className={styles.copyBtn}
          aria-label={copied ? 'Copied!' : 'Copy code'}
        >
          {copied ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
          <span className={styles.copyLabel}>
            {copied ? 'Copied!' : 'Copy'}
          </span>
        </button>
      </div>
      <Highlight
        theme={activeTheme}
        code={code.trim()}
        language={highlightLang}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} ${styles.pre}`} style={style}>
            {tokens.map((line, lineIndex) => {
              const lineProps = getLineProps({ line })
              return (
                <div key={lineIndex} {...lineProps} className={styles.line}>
                  <span className={styles.lineNum}>{lineIndex + 1}</span>
                  <span className={styles.lineCode}>
                    {line.map((token, tokenIndex) => {
                      const tokenProps = getTokenProps({ token })
                      return <span key={tokenIndex} {...tokenProps} />
                    })}
                  </span>
                </div>
              )
            })}
          </pre>
        )}
      </Highlight>
    </div>
  )
}
