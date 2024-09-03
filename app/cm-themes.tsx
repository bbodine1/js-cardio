import { tags as t } from '@lezer/highlight'
import { createTheme } from '@uiw/codemirror-themes'

export const vscodeLightTheme = createTheme({
  theme: 'light',
  settings: {
    background: '#FFFFFF',
    foreground: '#000000',
    caret: '#000000',
    selection: '#ADD6FF',
    selectionMatch: '#ADD6FF',
    lineHighlight: '#F0F0F0',
    gutterBackground: '#FFFFFF',
    gutterForeground: '#919191',
  },
  styles: [
    { tag: t.comment, color: '#008000' },
    { tag: t.variableName, color: '#0070C1' },
    { tag: [t.string, t.special(t.brace)], color: '#A31515' },
    { tag: t.number, color: '#098658' },
    { tag: t.bool, color: '#0000FF' },
    { tag: t.null, color: '#0000FF' },
    { tag: t.keyword, color: '#0000FF' },
    { tag: t.operator, color: '#000000' },
    { tag: t.className, color: '#267F99' },
    { tag: t.definition(t.typeName), color: '#267F99' },
    { tag: t.typeName, color: '#267F99' },
    { tag: t.angleBracket, color: '#800000' },
    { tag: t.tagName, color: '#800000' },
    { tag: t.attributeName, color: '#FF0000' },
  ],
})

export const vscodeDarkTheme = createTheme({
  theme: 'dark',
  settings: {
    background: '#1E1E1E',
    foreground: '#D4D4D4',
    caret: '#FFFFFF',
    selection: '#264F78',
    selectionMatch: '#264F78',
    lineHighlight: '#2A2D2E',
    gutterBackground: '#1E1E1E',
    gutterForeground: '#858585',
  },
  styles: [
    { tag: t.comment, color: '#6A9955' },
    { tag: t.variableName, color: '#9CDCFE' },
    { tag: [t.string, t.special(t.brace)], color: '#CE9178' },
    { tag: t.number, color: '#B5CEA8' },
    { tag: t.bool, color: '#569CD6' },
    { tag: t.null, color: '#569CD6' },
    { tag: t.keyword, color: '#569CD6' },
    { tag: t.operator, color: '#D4D4D4' },
    { tag: t.className, color: '#4EC9B0' },
    { tag: t.definition(t.typeName), color: '#4EC9B0' },
    { tag: t.typeName, color: '#4EC9B0' },
    { tag: t.angleBracket, color: '#808080' },
    { tag: t.tagName, color: '#569CD6' },
    { tag: t.attributeName, color: '#9CDCFE' },
  ],
})
