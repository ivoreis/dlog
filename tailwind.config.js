// Default tailwind config - https://tailwindcss.com/docs/configuration/

const elements = [
  'a', 'strong', 'ol > li::before', 'blockquote', 
  'h1', 'h2', 'h3', 'h4', 'figure figcaption',
  'code', 'a code', 'pre', 'thead'
]

module.exports = {
  purge: {
    mode: 'all',
    content: ['./src/**/*.{tsx,mdx}', './slides/**/*.mdx'],
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  theme: {
    typography: {
      default: {
        css: {
          color: 'var(--color-text)',
          maxWidth: 'none',
          ...(elements.reduce((acc, element) => ({
            ...acc,
            [element]: {
              color: 'var(--color-text)',
            }
          }),{}))
        },
      },
    },
    extend: {
      colors: {
        text: 'var(--color-text)',
        background: 'var(--color-background)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        muted: 'var(--color-muted)',
        highlight: 'var(--color-highlight)',
        accent: 'var(--color-accent)',
      },
      textColor: {
        default: 'var(--color-text)',
        invert: 'var(--color-background)'
      },
      backgroundColor: {
        default: 'var(--color-background)',
        invert: 'var(--color-text)'
      },
      borderColor: {
        default: 'var(--color-text)',
        invert: 'var(--color-background)'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // eslint-disable-line
    require('@tailwindcss/typography'), // eslint-disable-line
    require('@tailwindcss/aspect-ratio'), // eslint-disable-line
  ]
};
