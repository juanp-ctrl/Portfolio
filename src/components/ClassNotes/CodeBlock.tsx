'use client'
import { useState, useCallback } from 'react'
import { Highlight } from 'prism-react-renderer'
import { obsidianTheme } from './obsidianTheme'
import type { CodeLanguage } from './types'
import styles from './styles.module.css'

interface CodeBlockProps {
  code: string
  language: CodeLanguage
}

const languageLabels: Record<CodeLanguage, string> = {
  javascript: 'JS',
  jsx: 'JSX',
  typescript: 'TS',
  tsx: 'TSX',
  html: 'HTML',
  css: 'CSS',
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }, [code])

  return (
    <div className={styles.codeBlock}>
      <div className={styles.codeHeader}>
        <span className={styles.languageBadge}>{languageLabels[language]}</span>
        <button
          onClick={handleCopy}
          className={styles.copyButton}
          aria-label={copied ? 'Copied!' : 'Copy code'}
        >
          {copied ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
        </button>
      </div>
      <Highlight theme={obsidianTheme} code={code.trim()} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} ${styles.codeContent}`} style={style}>
            {tokens.map((line, lineIndex) => {
              const { key: _lineKey, ...lineProps } = getLineProps({
                line,
                key: lineIndex,
              })
              return (
                <div
                  key={lineIndex}
                  {...lineProps}
                  className={`${lineProps.className || ''} ${styles.codeLine}`}
                >
                  <span className={styles.lineNumber}>{lineIndex + 1}</span>
                  <span className={styles.lineContent}>
                    {line.map((token, tokenIndex) => {
                      const { key: _tokenKey, ...tokenProps } = getTokenProps({
                        token,
                        key: tokenIndex,
                      })
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
