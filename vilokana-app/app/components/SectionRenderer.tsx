import { Hero } from './sections/Hero'
import { TextBlock } from './sections/TextBlock'
import { Values } from './sections/Values'
import { Features } from './sections/Features'
import { Stories } from './sections/Stories'
import { Metrics } from './sections/Metrics'
import { CallToAction } from './sections/CallToAction'

type Section =
  | { _type: 'heroSection'; _key: string; headline: string; subheadline?: string; image?: any }
  | { _type: 'textBlockSection'; _key: string; content: any; image?: any; imagePosition?: 'left' | 'right' }
  | { _type: 'valuesSection'; _key: string; heading: string; values: Array<{ _key: string; title: string; description?: string }> }
  | { _type: 'featuresSection'; _key: string; heading?: string; features: Array<any> }
  | { _type: 'storiesSection'; _key: string; heading?: string; stories: Array<any> }
  | { _type: 'metricsSection'; _key: string; heading?: string; metrics: Array<{ _key: string; value: string; label: string }> }
  | { _type: 'ctaSection'; _key: string; heading: string; text?: string; button: any }

type SectionRendererProps = {
  sections: Section[]
}

export function SectionRenderer({ sections }: SectionRendererProps) {
  return (
    <>
      {sections.map((section) => {
        switch (section._type) {
          case 'heroSection':
            return (
              <Hero
                key={section._key}
                headline={section.headline}
                subheadline={section.subheadline}
                image={section.image}
              />
            )
          case 'textBlockSection':
            return (
              <TextBlock
                key={section._key}
                content={section.content}
                image={section.image}
                imagePosition={section.imagePosition}
              />
            )
          case 'valuesSection':
            return (
              <Values
                key={section._key}
                heading={section.heading}
                values={section.values}
              />
            )
          case 'featuresSection':
            return (
              <Features
                key={section._key}
                heading={section.heading}
                features={section.features}
              />
            )
          case 'storiesSection':
            return (
              <Stories
                key={section._key}
                heading={section.heading}
                stories={section.stories}
              />
            )
          case 'metricsSection':
            return (
              <Metrics
                key={section._key}
                heading={section.heading}
                metrics={section.metrics}
              />
            )
          case 'ctaSection':
            return (
              <CallToAction
                key={section._key}
                heading={section.heading}
                text={section.text}
                button={section.button}
              />
            )
          default:
            return null
        }
      })}
    </>
  )
}
