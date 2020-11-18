import { useEffect } from 'react'
import { useRouter } from 'next/router'

import fs from 'fs'
import path from 'path'
import dynamic from 'next/dynamic'

import {
  useStateManager,
  SectionMap,
  defaultConfig,
  Config,
} from '~/hooks/stateManager'

import { globPromise } from '~/utils/path'

const SLIDE_SPLITTER_REGEXP = /---/g

export interface DeckProps {
  sectionName: string
  deckName: string
  sectionMap: SectionMap[]
  config: Config
}

export interface GlobResponse {
  filename: string
  dirname: string
}

const Deck = (props: DeckProps) => {
  const { sectionName, deckName, sectionMap = [], config } = props
  const { dispatch } = useStateManager()
  const router = useRouter()

  const { deck, section, slide } = router.query
  const currentSection = sectionMap.find((s) => s.sectionName === sectionName)

  if (!currentSection) {
    return null
  }

  const Slide = dynamic(() => import(`slides/${deckName}/${sectionName}.mdx`))

  useEffect(() => {
    dispatch({
      type: 'CURRENT_SECTION',
      payload: { currentSection: sectionName },
    })
  }, [section])

  useEffect(() => {
    dispatch({
      type: 'CURRENT_SLIDE',
      payload: {
        currentSlide: slide
          ? Math.min(
              Math.max(parseInt(slide as string, 10), 1),
              currentSection.slideCount,
            )
          : 1,
      },
    })
  }, [slide])

  useEffect(() => {
    dispatch({
      type: 'CURRENT_DECK',
      payload: { currentDeck: deck as string },
    })
  }, [deck])

  useEffect(() => {
    dispatch({
      type: 'SECTION_MAP',
      payload: { sectionMap },
    })
  }, [])

  useEffect(() => {
    dispatch({
      type: 'CONFIG',
      payload: { config },
    })
  }, [])

  return <Slide />
}

export const getStaticProps = ({ params }) => {
  const { deck, section } = params
  const deckPath = path.join(process.cwd(), 'slides', deck)

  const sectionMap: SectionMap[] = fs
    .readdirSync(deckPath)
    .filter((filename) => filename.endsWith('.mdx'))
    .reduce((acc, filename) => {
      const slideBreaks = fs
        .readFileSync(path.join(deckPath, filename), 'utf-8')
        .match(SLIDE_SPLITTER_REGEXP)
      return [
        ...acc,
        {
          sectionName: filename.replace('.mdx', ''),
          slideCount: (slideBreaks || []).length + 1,
        },
      ]
    }, [])

  let config
  try {
    config = {
      ...defaultConfig,
      ...JSON.parse(
        fs.readFileSync(`${deckPath}/config.json`, {
          encoding: 'utf-8',
        }),
      ),
    }
  } catch (error) {
    config = {
      ...defaultConfig,
    }
  }

  return {
    props: {
      deckName: deck,
      sectionName: section,
      config,
      sectionMap,
    },
  }
}

export const getStaticPaths = async () => {
  const slides = (await globPromise(
    path.join(process.cwd(), 'slides'),
    true,
  )) as GlobResponse[]

  return {
    paths: slides.map((response) => ({
      params: {
        deck: response.dirname,
        section: response.filename.replace('.mdx', ''),
      },
    })),
    fallback: false,
  }
}

export default Deck
