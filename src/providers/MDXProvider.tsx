import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import SpeakerNotes from '~/components/SpeakerNotes'
import Cover from '~/components/Cover'
import Columns from '~/components/Columns'
import CodeSnippet from '~/components/CodeSnippet'

import Section from '~/layouts/Section'

const mdComponents = {
  h1: (props) => {
    const { children, ...rest } = props
    return <h1 {...rest}>{children}</h1>
  },
  pre: (props) => props.children,
  code: (props) => {
    const { className } = props
    const language = className.replace('language-', '')
    return <CodeSnippet language={language} {...props} />
  },
  SpeakerNotes,
  Cover,
  Section,
  Columns,
  CodeSnippet,
}

const MDX = ({ children }) => (
  <MDXProvider components={mdComponents}>{children}</MDXProvider>
)

export default MDX
