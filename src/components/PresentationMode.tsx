import { FC } from 'react'
import { modes } from '~/hooks/stateManager'

const Wrapper: FC = (props) => {
  const { children } = props
  return (
    <div className="prose flex flex-1 flex-col w-full sm:w-3/4 mx-auto text-xl">
      {children}
    </div>
  )
}

const PresentationMode = ({ mode, notes, children }) => {
  if (mode === modes.speaker) {
    return (
      <Wrapper>
        <div id="slide-container">{children}</div>
        <div id="notes-container">
          <h2>Presenter Notes</h2>
          {notes}
        </div>
      </Wrapper>
    )
  }
  return <Wrapper>{children}</Wrapper>
}

export default PresentationMode
