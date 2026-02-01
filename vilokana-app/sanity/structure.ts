import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Schema")
    .items([
      S.listItem()
        .title("Settings")
        .child(S.document().schemaType("settings").documentId("settings")),
      S.listItem()
        .title("Home")
        .child(S.document().schemaType("home").documentId("home")),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !["home", "settings"].includes(item.getId()!),
      ),
    ]);
