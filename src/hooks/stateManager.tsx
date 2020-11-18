import React, { createContext, FunctionComponent, useContext } from 'react'
import { useEffectReducer, EffectReducerExec } from 'use-effect-reducer'

export type Mode = 'slideshow' | 'speaker'
export type Theme = 'light' | 'dark'
export type ColorMode = 'light' | 'dark'

export const modes: { [k in Mode]: k } = {
  slideshow: 'slideshow',
  speaker: 'speaker',
}

export interface SectionMap {
  sectionName: string
  slideCount: number
}

export interface Config {
  title: string
  description: string
  author: string
  date: string
  theme: Theme
  cover?: string
  transitions: { enabled: boolean; timing: number }
}

export const defaultConfig: Config = {
  title: '',
  description: '',
  author: '',
  date: '',
  cover: '',
  theme: 'light',
  transitions: {
    enabled: false,
    timing: 50,
  },
}

export interface StateManagerState {
  mode: Mode
  colorMode: ColorMode
  theme: Theme
  showHelp: boolean
  showNav: boolean
  currentDeck: string
  currentSection: string
  currentSlide: number
  sectionMap: SectionMap[]
  config: Config
}

export const defaultState: StateManagerState = {
  showHelp: false,
  showNav: false,
  mode: modes.slideshow,
  colorMode: 'light',
  theme: 'light',
  sectionMap: [],
  currentDeck: '',
  currentSection: '',
  currentSlide: 0,
  config: {} as Config,
}

export type StateManagerReducerEventType =
  | 'MODE'
  | 'CURRENT_DECK'
  | 'CURRENT_SECTION'
  | 'CURRENT_SLIDE'
  | 'SECTION_MAP'
  | 'CONFIG'
  | 'SHOW_HELP'
  | 'SHOW_NAV'
  | 'COLOR_MODE'
  | 'THEME'

export interface StateManagerReducerEvent {
  type: StateManagerReducerEventType
  payload?: Partial<StateManagerState>
}

export interface StateManagerContextProps {
  initialState: StateManagerState
}

export interface StateManagerValueProps {
  state: StateManagerState
  dispatch: React.Dispatch<StateManagerReducerEvent>
}

export const StateManagerContext = createContext<StateManagerValueProps>(
  {} as StateManagerValueProps,
)

//https://github.com/davidkpiano/useEffectReducer
const reducer = (
  state: StateManagerState,
  event: StateManagerReducerEvent,
  exec: EffectReducerExec<
    StateManagerState,
    StateManagerReducerEvent,
    StateManagerReducerEvent
  >,
) => {
  switch (event.type) {
    case 'CURRENT_SLIDE':
      return {
        ...state,
        currentSlide: event.payload.currentSlide,
      }
    case 'CURRENT_SECTION':
      return {
        ...state,
        currentSection: event.payload.currentSection,
      }
    case 'CURRENT_DECK':
      return {
        ...state,
        currentDeck: event.payload.currentDeck,
      }
    case 'MODE':
      return {
        ...state,
        mode: event.payload.mode,
      }
    case 'SHOW_HELP':
      return {
        ...state,
        showHelp: event.payload.showHelp,
      }
    case 'SHOW_NAV':
      return {
        ...state,
        showNav: event.payload.showNav,
      }
    case 'SECTION_MAP':
      return {
        ...state,
        sectionMap: event.payload.sectionMap,
      }
    case 'CONFIG':
      return {
        ...state,
        config: event.payload.config,
      }
    case 'COLOR_MODE':
      exec(() => {
        document.documentElement.setAttribute(
          'color-mode',
          event.payload.colorMode,
        )
        localStorage.setItem('color-mode', event.payload.colorMode)
      })
      return {
        ...state,
        colorMode: event.payload.colorMode,
      }
    case 'THEME':
      return {
        ...state,
        theme: event.payload.theme,
      }
    default:
      return state
  }
}

const StateManager: FunctionComponent<StateManagerContextProps> = (props) => {
  const { children, initialState } = props
  const [state, dispatch] = useEffectReducer<
    StateManagerState,
    StateManagerReducerEvent,
    StateManagerReducerEvent
  >(reducer, {
    ...initialState,
  })

  return (
    <StateManagerContext.Provider value={{ state, dispatch }}>
      {children}
    </StateManagerContext.Provider>
  )
}

export const useStateManager = () => useContext(StateManagerContext)

export default StateManager
