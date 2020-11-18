import { Fragment } from 'react'
import fs from 'fs'
import path from 'path'
import PreviewCard from '~/components/PreviewCard'
import Header from '~/components/Header'

import { defaultConfig, Config } from '~/hooks/stateManager'

export interface Deck {
  name: string
  config: Config
  sections: string[]
}

export interface DeckProps {
  decks: Deck[]
}

const HomeDeck = (props: DeckProps) => {
  const { decks } = props
  const sortedDecks = decks.sort(
    (a, b) =>
      Date.parse(a.config.date || '0') - Date.parse(b.config.date || '0'),
  )

  return (
    <Fragment>
      <Header showNav />
      <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="absolute inset-0">
          <div className="bg-default transition duration-150 ease-in-out h-1/3 sm:h-2/3" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl leading-9 tracking-tight font-extrabold text-default sm:text-4xl sm:leading-10">
              From the deck
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl leading-7 text-default sm:mt-4">
              A collection of available presentation decks
            </p>
          </div>
          <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
            {sortedDecks.map((deck) => (
              <PreviewCard
                key={deck.config.title}
                type="deck"
                title={deck.config.title}
                description={deck.config.description}
                coverImage={deck.config.cover}
                date={deck.config.date}
                url={deck.sections[0]}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export const getStaticProps = () => {
  const decks = fs
    .readdirSync(path.join(process.cwd(), 'slides'))
    .map((name) => {
      let config = {}

      const sections = fs
        .readdirSync(path.join(process.cwd(), 'slides', name))
        .filter((filename) => filename.endsWith('mdx'))
        .map((filename) => `/deck/${name}/${filename.replace('.mdx', '')}`)

      try {
        config = JSON.parse(
          fs.readFileSync(
            `${path.join(process.cwd(), 'slides', name)}/config.json`,
            {
              encoding: 'utf-8',
            },
          ),
        )
      } catch (error) {
        config = {}
      }
      return {
        name,
        sections,
        config: {
          ...defaultConfig,
          ...config,
        },
      }
    })

  return {
    props: {
      decks,
    },
  }
}

export default HomeDeck
