import type { PrismTheme } from 'prism-react-renderer'

export const obsidianTheme: PrismTheme = {
  plain: {
    color: '#1E1E1E',
    backgroundColor: '#F8E8C0',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: '#6B7280',
        fontStyle: 'italic',
      },
    },
    {
      types: ['namespace'],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ['string', 'attr-value'],
      style: {
        color: '#228B22',
      },
    },
    {
      types: ['punctuation', 'operator'],
      style: {
        color: '#1E1E1E',
      },
    },
    {
      types: [
        'entity',
        'url',
        'symbol',
        'number',
        'boolean',
        'variable',
        'constant',
        'property',
        'regex',
        'inserted',
      ],
      style: {
        color: '#D4A017',
      },
    },
    {
      types: ['atrule', 'keyword', 'attr-name', 'selector'],
      style: {
        color: '#4B89DC',
      },
    },
    {
      types: ['function', 'deleted', 'tag'],
      style: {
        color: '#4B89DC',
      },
    },
    {
      types: ['function-variable'],
      style: {
        color: '#D4A017',
      },
    },
    {
      types: ['tag', 'selector', 'keyword'],
      style: {
        color: '#4B89DC',
      },
    },
    {
      types: ['class-name'],
      style: {
        color: '#D4A017',
      },
    },
  ],
}
