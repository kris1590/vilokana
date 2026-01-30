import { defineQuery } from 'next-sanity'

export const pageBySlugQuery = defineQuery(/* groq */ `
  *[_type == "page" && (
    ($slug == "" && (slug.current == "" || !defined(slug.current))) ||
    ($slug != "" && slug.current == $slug)
  )][0] {
    _id,
    _type,
    title,
    "slug": slug.current,
    site,
    seo {
      title,
      description
    },
    sections[] {
      _key,
      _type,
      _type == "heroSection" => {
        headline,
        subheadline,
        image {
          asset->{
            _id,
            url,
            metadata {
              lqip,
              dimensions
            }
          },
          alt
        }
      },
      _type == "textBlockSection" => {
        content,
        image {
          asset->{
            _id,
            url,
            metadata {
              lqip,
              dimensions
            }
          },
          alt
        },
        imagePosition
      },
      _type == "valuesSection" => {
        heading,
        values[] {
          _key,
          title,
          description
        }
      },
      _type == "featuresSection" => {
        heading,
        features[] {
          _key,
          title,
          description,
          image {
            asset->{
              _id,
              url,
              metadata {
                lqip,
                dimensions
              }
            },
            alt
          }
        }
      },
      _type == "storiesSection" => {
        heading,
        stories[] {
          _key,
          quote,
          author,
          role,
          image {
            asset->{
              _id,
              url,
              metadata {
                lqip,
                dimensions
              }
            },
            alt
          }
        }
      },
      _type == "metricsSection" => {
        heading,
        metrics[] {
          _key,
          value,
          label
        }
      },
      _type == "ctaSection" => {
        heading,
        text,
        button {
          linkType,
          internalLink->{
            _id,
            "slug": slug.current
          },
          externalUrl,
          label
        }
      }
    }
  }
`)

export const allPageSlugsQuery = defineQuery(/* groq */ `
  *[_type == "page" && defined(slug.current)] {
    "slug": slug.current,
    site
  }
`)

export const headerQuery = defineQuery(/* groq */ `
  *[_type == "header"][0] {
    _id,
    _type,
    logo {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions
        }
      },
      alt
    },
    logoText,
    navigation[] {
      _key,
      label,
      link {
        linkType,
        internalLink->{
          _id,
          "slug": slug.current
        },
        externalUrl,
        label
      },
      children[] {
        _key,
        label,
        link {
          linkType,
          internalLink->{
            _id,
            "slug": slug.current
          },
          externalUrl,
          label
        }
      }
    }
  }
`)

export const footerQuery = defineQuery(/* groq */ `
  *[_type == "footer"][0] {
    _id,
    _type,
    logo {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions
        }
      },
      alt
    },
    logoText,
    description,
    columns[] {
      _key,
      title,
      links[] {
        _key,
        label,
        link {
          linkType,
          internalLink->{
            _id,
            "slug": slug.current
          },
          externalUrl,
          label
        }
      }
    },
    copyright,
    socialLinks[] {
      _key,
      platform,
      url
    }
  }
`)
