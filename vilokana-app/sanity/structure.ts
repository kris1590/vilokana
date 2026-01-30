import type { StructureResolver } from 'sanity/structure'
import { MenuIcon, DocumentIcon } from '@sanity/icons'

const SINGLETONS = ['header', 'footer']

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Header and Footer (singletons - should only have one each)
      S.documentTypeListItem('header').title('Header'),
      S.documentTypeListItem('footer').title('Footer'),
      S.divider(),
      S.listItem()
        .title('Foundation Pages')
        .child(
          S.documentList()
            .title('Foundation Pages')
            .filter('_type == "page" && site == "foundation"')
            .defaultOrdering([{ field: 'title', direction: 'asc' }])
        ),
      S.listItem()
        .title('School Pages')
        .child(
          S.documentList()
            .title('School Pages')
            .filter('_type == "page" && site == "school"')
            .defaultOrdering([{ field: 'title', direction: 'asc' }])
        ),
      S.divider(),
      // Filter singletons from generic lists
      ...S.documentTypeListItems().filter(
        (item) => !SINGLETONS.includes(item.getId() as string)
      ),
    ])
