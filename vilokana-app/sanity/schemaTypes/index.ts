import { type SchemaTypeDefinition } from 'sanity'

// Documents
import { homeType } from './documents/home'
import { pageType } from './documents/page'
import { teamMemberType } from './documents/team-member'
import { programType } from './documents/program'
import { eventType } from './documents/event'
import { galleryItemType } from './documents/gallery-item'

// Objects
import { settingsType } from './objects/settings'
import { headerType } from './objects/header'
import { footerType } from './objects/footer'
import { linkType } from './objects/link'
import { internalLinkType } from './objects/internal-link'
import { externalLinkType } from './objects/external-link'
import { themeType } from './objects/theme'
import { seoType } from './objects/seo'
import { blockContentType } from './objects/block-content'

// Sections
import { sectionsType } from './sections/sections'
import { heroType } from './sections/hero'
import { ctaType } from './sections/cta'
import { contentSectionType } from './sections/content'
import { teamSectionType } from './sections/team'
import { programsSectionType } from './sections/programs'
import { gallerySectionType } from './sections/gallery'
import { eventsSectionType } from './sections/events'
import { donateSectionType } from './sections/donate'
import { statsSectionType } from './sections/stats'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Settings & Layout
    settingsType,
    headerType,
    footerType,

    // Documents
    homeType,
    pageType,
    teamMemberType,
    programType,
    eventType,
    galleryItemType,

    // Objects
    linkType,
    internalLinkType,
    externalLinkType,
    themeType,
    seoType,
    blockContentType,

    // Sections
    heroType,
    ctaType,
    contentSectionType,
    teamSectionType,
    programsSectionType,
    gallerySectionType,
    eventsSectionType,
    donateSectionType,
    statsSectionType,
    sectionsType,
  ],
}
