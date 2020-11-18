import { StateManagerState } from '~/hooks/stateManager'

export const Direction: { [k in 'PREVIOUS' | 'NEXT']: k } = {
  PREVIOUS: 'PREVIOUS',
  NEXT: 'NEXT',
}

export type SlideQuery =
  | { deck: string; section: string; slide: number }
  | undefined

export const generatePreviousSlideQuery = (
  state: StateManagerState,
): SlideQuery => {
  const currentSectionIndex = state.sectionMap.findIndex(
    (sectionInfo) => sectionInfo.sectionName === state.currentSection,
  )
  const previousSectionInfo = state.sectionMap[currentSectionIndex - 1]
  const showPreviousSection = state.currentSlide === 1
  const previousSlide = showPreviousSection
    ? previousSectionInfo?.slideCount
    : state.currentSlide - 1

  if (showPreviousSection && !previousSectionInfo && !previousSlide) {
    return undefined
  }

  const previousSection = showPreviousSection
    ? previousSectionInfo.sectionName
    : state.currentSection

  return {
    deck: state.currentDeck,
    section: previousSection,
    slide: previousSlide,
  }
}

export const generateNextSlideQuery = (
  state: StateManagerState,
): SlideQuery => {
  const currentSectionIndex = state.sectionMap.findIndex(
    (sectionInfo) => sectionInfo.sectionName === state.currentSection,
  )
  const currentSectionInfo = state.sectionMap[currentSectionIndex]
  const nextSectionInfo = state.sectionMap[currentSectionIndex + 1]
  const showNextSection = state.currentSlide >= currentSectionInfo.slideCount
  const nextSlide = showNextSection ? 1 : state.currentSlide + 1

  if (showNextSection && !nextSectionInfo) {
    return undefined
  }

  const nextSection = showNextSection
    ? nextSectionInfo.sectionName
    : state.currentSection

  return {
    deck: state.currentDeck,
    section: nextSection,
    slide: nextSlide,
  }
}
