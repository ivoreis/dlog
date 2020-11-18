import {
  generatePreviousSlideQuery,
  generateNextSlideQuery,
  SlideQuery,
} from './router'
import { StateManagerState } from '~/hooks/stateManager'

describe('generateNextSlideQuery', () => {
  it('generates the next slug & slide for the same section', () => {
    const nextSlideSameSection: StateManagerState = {
      mode: 'SLIDESHOW',
      currentDeck: 'deck-1',
      currentSection: 'section-1',
      currentSlide: 1,
      sectionMap: [
        { sectionName: 'section-1', slideCount: 2 },
        { sectionName: 'section-2', slideCount: 1 },
      ],
    }

    expect(generateNextSlideQuery(nextSlideSameSection)).toStrictEqual({
      deck: nextSlideSameSection.currentDeck,
      section: nextSlideSameSection.currentSection,
      slide: nextSlideSameSection.currentSlide + 1,
    } as SlideQuery)
  })

  it('generates the next slug & slide for a different section', () => {
    const nextSlideDifferentSection: StateManagerState = {
      mode: 'SLIDESHOW',
      currentDeck: 'deck-1',
      currentSection: 'section-1',
      currentSlide: 2,
      sectionMap: [
        { sectionName: 'section-1', slideCount: 2 },
        { sectionName: 'section-2', slideCount: 1 },
      ],
    }

    expect(generateNextSlideQuery(nextSlideDifferentSection)).toStrictEqual({
      deck: nextSlideDifferentSection.currentDeck,
      section: 'section-2',
      slide: 1,
    } as SlideQuery)
  })

  it("returns undefined if there isn't a next section to show", () => {
    const noNextSection: StateManagerState = {
      mode: 'SLIDESHOW',
      currentDeck: 'deck-1',
      currentSection: 'section-2',
      currentSlide: 1,
      sectionMap: [
        { sectionName: 'section-1', slideCount: 2 },
        { sectionName: 'section-2', slideCount: 1 },
      ],
    }

    expect(generateNextSlideQuery(noNextSection)).toStrictEqual(
      undefined as SlideQuery,
    )
  })
})

describe('generatePreviousSlideQuery', () => {
  it('generates the previous slug & slide for the same section', () => {
    const previousSlideSameSection: StateManagerState = {
      mode: 'SLIDESHOW',
      currentDeck: 'deck-1',
      currentSection: 'section-1',
      currentSlide: 2,
      sectionMap: [
        { sectionName: 'section-1', slideCount: 2 },
        { sectionName: 'section-2', slideCount: 1 },
      ],
    }

    expect(generatePreviousSlideQuery(previousSlideSameSection)).toStrictEqual({
      deck: previousSlideSameSection.currentDeck,
      section: previousSlideSameSection.currentSection,
      slide: previousSlideSameSection.currentSlide - 1,
    } as SlideQuery)
  })

  it('generates the previous slug & slide for a different section', () => {
    const previousSlideDifferentSection: StateManagerState = {
      mode: 'SLIDESHOW',
      currentDeck: 'deck-1',
      currentSection: 'section-2',
      currentSlide: 1,
      sectionMap: [
        { sectionName: 'section-1', slideCount: 2 },
        { sectionName: 'section-2', slideCount: 1 },
      ],
    }

    expect(
      generatePreviousSlideQuery(previousSlideDifferentSection),
    ).toStrictEqual({
      deck: previousSlideDifferentSection.currentDeck,
      section: 'section-1',
      slide: 2,
    } as SlideQuery)
  })

  it("returns undefined if there isn't a previous section to show", () => {
    const noPreviousSection: StateManagerState = {
      mode: 'SLIDESHOW',
      currentDeck: 'deck-1',
      currentSection: 'section-1',
      currentSlide: 1,
      sectionMap: [
        { sectionName: 'section-1', slideCount: 2 },
        { sectionName: 'section-2', slideCount: 1 },
      ],
    }

    expect(generatePreviousSlideQuery(noPreviousSection)).toStrictEqual(
      undefined as SlideQuery,
    )
  })
})
