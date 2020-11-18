import React, { Component, ReactNode } from 'react'
import { ComponentName as SpeakerNotesName } from '~/components/SpeakerNotes'

export interface SlideGroup {
  content: ReactNode[]
  notes: ReactNode[]
}

const handleSlides = (node: Component<{ mdxType?: string }>) =>
  node.props.mdxType !== SpeakerNotesName ? [node] : []

const handleNotes = (node: Component<{ mdxType?: string }>) =>
  node.props.mdxType === SpeakerNotesName ? [node] : []

export const extractContent = (sectionName: string) => (
  children: ReactNode,
) => {
  const result = React.Children.toArray(children).reduce<{
    slides: { [k: number]: SlideGroup }
    totalSlides: number
  }>(
    (acc, child: Component<{ mdxType?: string }>) => {
      const isNewSlide = child.props.mdxType === 'hr'
      const currentSlide = acc.totalSlides + (isNewSlide ? 1 : 0)
      const current = acc.slides[currentSlide] || undefined

      return {
        totalSlides: currentSlide,
        slides: {
          ...acc.slides,
          [currentSlide]: {
            content: [
              ...(current?.content || []),
              ...(isNewSlide ? [] : handleSlides(child)),
            ],
            notes: [
              ...(current?.notes || []),
              ...(isNewSlide ? [] : handleNotes(child)),
            ],
          },
        },
      }
    },
    {
      slides: {},
      totalSlides: 0,
    },
  )

  return {
    sectionName,
    slides: Object.values(result.slides),
    totalSlides: result.totalSlides,
  }
}
