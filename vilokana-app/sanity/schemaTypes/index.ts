import { type SchemaTypeDefinition } from 'sanity'

import { pageType } from './pageType'
import { headerType } from './headerType'
import { footerType } from './footerType'
import { richTextType } from './shared/richText'
import { imageType } from './shared/image'
import { linkType } from './shared/link'
import { heroSectionType } from './sections/heroSection'
import { textBlockSectionType } from './sections/textBlockSection'
import { valuesSectionType } from './sections/valuesSection'
import { featuresSectionType } from './sections/featuresSection'
import { storiesSectionType } from './sections/storiesSection'
import { metricsSectionType } from './sections/metricsSection'
import { ctaSectionType } from './sections/ctaSection'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    pageType,
    headerType,
    footerType,
    richTextType,
    imageType,
    linkType,
    heroSectionType,
    textBlockSectionType,
    valuesSectionType,
    featuresSectionType,
    storiesSectionType,
    metricsSectionType,
    ctaSectionType,
  ],
}
