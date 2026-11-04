/** Helpers for building HTML strings from Markdown (rendered via dangerouslySetInnerHTML). */

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

const ALLOWED_SCHEMES = new Set(['http:', 'https:', 'mailto:'])

/**
 * Allow only http(s), mailto and same-origin relative URLs. Anything else
 * (`javascript:`, `data:`, protocol-relative `//host`, …) becomes `#`.
 * Returns an HTML-attribute-escaped value.
 */
export function safeUrl(url: string): string {
  // Browsers ignore ASCII whitespace/control chars when parsing the scheme
  // (e.g. "java\tscript:"), so strip them before checking.
  const normalized = url.replace(/[\u0000-\u0020\u007f]/g, '')
  const scheme = /^([a-z][a-z0-9+.-]*:)/i.exec(normalized)?.[1].toLowerCase()

  if (scheme ? ALLOWED_SCHEMES.has(scheme) : !/^[/\\]{2}/.test(normalized)) {
    return escapeHtml(url.trim())
  }
  return '#'
}
