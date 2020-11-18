// @ts-ignore
import tailwindDefaultTheme from 'tailwindcss/defaultTheme'
import dark from 'react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus'
import light from 'react-syntax-highlighter/dist/cjs/styles/prism/vs'
// coy / ghcolors / prism /

export const lightTheme = light
export const darkTheme = dark

export default {
  '.react-syntax-highlighter-line-number': {
    display: 'none!important',
  },
  'div#__next': {
    height: '100vh',
  },
  ':root, :root[color-mode="light"]': {
    '--color-text': tailwindDefaultTheme.colors.black,
    '--color-background': tailwindDefaultTheme.colors.white,
    '--color-primary': tailwindDefaultTheme.colors.blue['500'],
    '--color-secondary': tailwindDefaultTheme.colors.red['500'],
    '--color-muted': tailwindDefaultTheme.colors.red['500'],
    '--color-highlight': tailwindDefaultTheme.colors.green['500'],
    '--color-accent': tailwindDefaultTheme.colors.red['500'],
  },
  ':root[color-mode="dark"]': {
    '--color-text': tailwindDefaultTheme.colors.white,
    '--color-background': tailwindDefaultTheme.colors.black,
    '--color-primary': tailwindDefaultTheme.colors.blue['500'],
    '--color-secondary': tailwindDefaultTheme.colors.red['500'],
    '--color-muted': tailwindDefaultTheme.colors.red['500'],
    '--color-highlight': tailwindDefaultTheme.colors.green['500'],
    '--color-accent': tailwindDefaultTheme.colors.red['500'],
  },
}
