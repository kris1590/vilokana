import { type SchemaTypeDefinition } from 'sanity'


import { homeType } from './documents/home'
import { pageType } from './documents/page'
import { sectionsType } from './sections/sections'
import { settingsType } from './objects/settings'
import { headerType } from './objects/header'
import { footerType } from './objects/footer'
import { linkType } from './objects/link'
import { internalLinkType } from './objects/internal-link'
import { externalLinkType } from './objects/external-link'
import { themeType } from './objects/theme'
import { heroType } from './sections/hero'
import { seoType } from './objects/seo'
import { ctaType } from './sections/cta'
import { blockContentType } from './objects/block-content'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    settingsType,
    headerType,
    footerType,
    homeType,
    pageType,
    linkType,
    internalLinkType,
    externalLinkType,
    themeType,
    seoType,
    heroType,
    blockContentType,
    ctaType,
    sectionsType,
  ],
}
