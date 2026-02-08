import { groq } from "next-sanity";

export const SETTINGS_QUERY = groq`
  *[_type == "settings"][0] {
    header {
      links[] { 
        ..., 
        "reference": reference->{
          _type,
          "slug": slug.current
        }
      }
    },
    footer {
      links[] { 
        ..., 
        "reference": reference->{
          _type,
          "slug": slug.current
        }
      }
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
    cta{
      ...,
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
  },
  _type == "contentSection" => {
    ...,
    "media": {
      ...media,
      "image": media.image.asset->url
    }
  },
  _type == "teamSection" => {
    ...,
    "members": members[]->{
      _id,
      name,
      role,
      image,
      bio,
      organization
    }
  },
  _type == "programsSection" => {
    ...,
    "programs": programs[]->{
      _id,
      title,
      slug,
      shortDescription,
      category,
      organization,
      "thumbnail": {
        "url": thumbnail.asset->url,
        "alt": thumbnail.alt
      }
    }
  },
  _type == "gallerySection" => {
    ...,
    "images": images[]{
      _key,
      _type,
      _type == "image" => {
        ...,
        "asset": asset->url,
        alt,
        caption
      }
    }
  },
  _type == "eventsSection" => {
    ...,
    "events": events[]->{
   ...,
   event->{
    ...,
    "image": image.asset->url
   }
    }
  },
  _type == "donateSection" => {
    ...,
    "image": image.asset->url,
    cta{
      ...,
      "reference": reference->{
        _type,
        "slug": slug.current
      }
    }
  },
  _type == "statsSection" => {
    ...
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

export const PROGRAM_DETAIL_QUERY = groq`
  *[_type == "program" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    shortDescription,
    date,
    description[]{
      ...,
      _type == "image" => {
        ...,
        "url": asset->url
      },
      _type == "video" => {
        ...,
        "url": asset->url
      }
    },
    highlights,
    outcomes,
    category,
    organization
  }
`;