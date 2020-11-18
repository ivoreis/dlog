import { useMemo, Dispatch, FC } from 'react'
import Head from 'next/head'
import { useSwipeable } from 'react-swipeable'
import { useRouter, NextRouter } from 'next/router'

import PresentationMode from '~/components/PresentationMode'
import HelpModal from '~/components/HelpModal'
import Header from '~/components/Header'

import { extractContent } from '~/utils/content'
import { keyCodes } from '~/utils/keyboard'
import {
  generateNextSlideQuery,
  generatePreviousSlideQuery,
  Direction,
  SlideQuery,
} from '~/utils/router'

import useEventListener from '~/hooks/useEventListener'
import {
  StateManagerReducerEvent,
  StateManagerState,
  useStateManager,
  Mode,
  ColorMode,
} from '~/hooks/stateManager'

const shortcutMapper = (state: StateManagerState) => ({
  [keyCodes.leftArrow]: {
    query: generatePreviousSlideQuery(state),
    direction: Direction.PREVIOUS,
  },
  [keyCodes.rightArrow]: {
    query: generateNextSlideQuery(state),
    direction: Direction.NEXT,
  },
  [keyCodes.spacebar]: {
    query: generateNextSlideQuery(state),
    direction: Direction.NEXT,
  },
  [keyCodes.enter]: {
    query: generateNextSlideQuery(state),
    direction: Direction.NEXT,
  },
  [keyCodes.p]: {
    mode: state.mode === 'slideshow' ? 'speaker' : 'slideshow',
  },
  [keyCodes.h]: {
    showHelp: !state.showHelp,
  },
  [keyCodes.n]: {
    showNav: !state.showNav,
  },
  [keyCodes.m]: {
    colorMode: state.colorMode === 'dark' ? 'light' : 'dark',
  },
})

const onKeyDown = (
  router: NextRouter,
  state: StateManagerState,
  dispatch: Dispatch<StateManagerReducerEvent>,
) => ({ keyCode }: { keyCode: number; altKey: boolean }) => {
  const handler = shortcutMapper(state)[keyCode]

  if (handler && handler.query) {
    const { query, direction } = handler
    const baseUrl = `/deck/${query.deck}/${query.section}/?slide=${query.slide}`
    router.push(`${baseUrl}&direction=${direction}`, baseUrl)
    window.localStorage.setItem(
      `/deck/${query.deck}/state`,
      JSON.stringify({ query, direction }),
    )
    return
  }

  if (handler && handler.mode) {
    dispatch({ type: 'MODE', payload: { mode: handler.mode as Mode } })
  }

  if (handler && handler.showHelp !== undefined) {
    dispatch({ type: 'SHOW_HELP', payload: { showHelp: handler.showHelp } })
  }

  if (handler && handler.showNav !== undefined) {
    dispatch({ type: 'SHOW_NAV', payload: { showNav: handler.showNav } })
  }

  if (handler && handler.colorMode !== undefined) {
    dispatch({
      type: 'COLOR_MODE',
      payload: { colorMode: handler.colorMode as ColorMode },
    })
  }
}

const handleStorage = (router: NextRouter, state: StateManagerState) => ({
  newValue,
}) => {
  const newState = JSON.parse(newValue) as {
    query: SlideQuery
    direction: keyof typeof Direction
  }

  if (state.currentDeck !== newState.query.deck) {
    return
  }

  const baseUrl = `/deck/${newState.query.deck}/${newState.query.section}/?slide=${newState.query.slide}`
  router.push(`${baseUrl}&direction=${newState.direction}`, baseUrl)
}

const Section: FC = (props) => {
  const { children } = props
  const { state, dispatch } = useStateManager()
  const { slides } = useMemo(
    () => extractContent(state.currentSection)(children),
    [children],
  )
  const router = useRouter()
  const currentSlide = slides[state.currentSlide - 1]

  const handleKeyDown = onKeyDown(router, state, dispatch)

  useEventListener('keydown', handleKeyDown)
  useEventListener('storage', handleStorage(router, state))

  return (
    <div
      className=" h-full flex flex-col"
      {...useSwipeable({
        onSwipedLeft: () =>
          handleKeyDown({ keyCode: keyCodes.rightArrow, altKey: false }),
        onSwipedRight: () =>
          handleKeyDown({ keyCode: keyCodes.leftArrow, altKey: false }),
      })}
    >
      <Head>
        <title>{state.config.title}</title>
      </Head>
      <Header showNav={state.showNav} />
      <PresentationMode mode={state.mode} notes={currentSlide.notes}>
        {currentSlide.content}
      </PresentationMode>
      {state.showHelp ? <HelpModal /> : null}
    </div>
  )
}

export default Section
