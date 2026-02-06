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
      description,
      image,
      highlights,
      outcomes,
      category,
      organization
    }
  },
  _type == "gallerySection" => {
    ...,
    "images": images[]{
      _key,
      _type,
      _type == "reference" => @->{
        _id,
        title,
        image,
        caption,
        category,
        tags
      },
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
      _id,
      title,
      slug,
      date,
      description,
      image,
      location
    }
  },
  _type == "donateSection" => {
    ...,
    "image": image.asset->url,
    cta{
      ...,
      "reference": reference->{
        _type,
        "slug": slug
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
