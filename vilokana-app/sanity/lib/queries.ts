import { groq } from "next-sanity";



export const SETTINGS_QUERY = groq`
  *[_type == "settings"][0] {
    header {
      links[] { ..., }
    },
    footer {
      links[] { ..., }
    }
  }
`;

let refinedSectionsFragment = groq`
sections[]{
  ...,
  _type == "hero" => {
    ...,
    "media": {
      ...media,
      "image": media.image.asset->url
    },
    "ctas": ctas[]{
      ...,
      "href": select(
        linkType == "external" => externalLink.url,
        "/" + internalLink.reference->slug.current
      ),
      "label": select(
        linkType == "external" => externalLink.title,
        internalLink.title
      )
    }
  },
  _type == "cta" => {
    ...,
    "media": {
      ...media,
      "image": media.image.asset->url
    },
    "ctas": ctas[]{
      ...,
      "href": select(
        linkType == "external" => externalLink.url,
        "/" + internalLink.reference->slug.current
      ),
      "label": select(
        linkType == "external" => externalLink.title,
        internalLink.title
      )
    }
  }
}`;

export const PAGE_QUERY = groq`
    *[_type == "page" && slug.current == $slug][0] {
    ...,
    ${refinedSectionsFragment}
  }
`;

export const HOME_QUERY = groq`
  *[_type == "home"][0] {
    ...,
    ${refinedSectionsFragment}
  }
`;
