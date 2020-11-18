import { FC } from 'react'
import { Language } from 'prism-react-renderer'
import { Prism } from 'react-syntax-highlighter'
import Frame from '~/components/Frame'
import { lightTheme, darkTheme } from '~/themes'

import { useStateManager } from '~/hooks/stateManager'

export interface CodeSnippetProps {
  snippet: string
  language: Language
  className?: string
}

const CodeSnippet: FC<CodeSnippetProps> = (props) => {
  const { language, children } = props
  const { state } = useStateManager()
  return (
    <Frame>
      <Prism
        language={language}
        style={{ ...(state.colorMode === 'light' ? darkTheme : lightTheme) }}
        customStyle={{ margin: 0, borderRadius: 0 }}
        wrapLongLines
      >
        {children}
      </Prism>
    </Frame>
  )
}

export default CodeSnippet
