import { groq } from "next-sanity";

let refinedSectionsFragment = groq`
sections[]{
  ...,
  _type == "hero" => {
    ...,
    "image": image.asset->url,
  },
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
