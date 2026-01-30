'use client'

import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

type HeaderProps = {
  logo?: {
    asset: {
      _id: string
      url: string
      metadata?: {
        lqip?: string
        dimensions?: {
          width: number
          height: number
        }
      }
    }
    alt: string
  }
  logoText?: string
  navigation?: Array<{
    _key: string
    label: string
    link?: {
      linkType: 'internal' | 'external'
      internalLink?: {
        _id: string
        slug: string
      }
      externalUrl?: string
      label: string
    }
    children?: Array<{
      _key: string
      label: string
      link: {
        linkType: 'internal' | 'external'
        internalLink?: {
          _id: string
          slug: string
        }
        externalUrl?: string
        label: string
      }
    }>
  }>
}

export function Header({ logo, logoText, navigation }: HeaderProps) {
  const getHref = (link: NonNullable<HeaderProps['navigation']>[0]['link']) => {
    if (!link) return '#'
    if (link.linkType === 'internal' && link.internalLink) {
      return `/${link.internalLink.slug}`
    }
    return link.externalUrl || '#'
  }

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-foreground/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            {logo ? (
              <div className="relative h-10 w-auto">
                <Image
                  src={urlFor(logo).width(200).height(40).url()}
                  alt={logo.alt}
                  fill
                  className="object-contain"
                  placeholder={logo.asset.metadata?.lqip ? 'blur' : 'empty'}
                  blurDataURL={logo.asset.metadata?.lqip}
                />
              </div>
            ) : (
              <span className="text-xl font-bold text-foreground">{logoText || 'Vilokana'}</span>
            )}
          </Link>

          {navigation && navigation.length > 0 && (
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => {
                const hasChildren = item.children && item.children.length > 0

                // Simple leaf link
                if (!hasChildren) {
                  if (!item.link) {
                    return (
                      <span
                        key={item._key}
                        className="text-foreground/80"
                      >
                        {item.label}
                      </span>
                    )
                  }

                  const href = getHref(item.link)
                  const isExternal = item.link.linkType === 'external'

                  return isExternal ? (
                    <a
                      key={item._key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/80 hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={item._key}
                      href={href}
                      className="text-foreground/80 hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </Link>
                  )
                }

                // Parent with dropdown (e.g. School)
                return (
                  <div key={item._key} className="relative group">
                    <button
                      type="button"
                      className="inline-flex items-center text-foreground/80 hover:text-foreground transition-colors"
                    >
                      <span>{item.label}</span>
                      <svg
                        className="ml-1 h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-background border border-foreground/10 py-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
                      {item.children?.map((child) => {
                        const href = getHref(child.link)
                        const isExternal = child.link.linkType === 'external'

                        return isExternal ? (
                          <a
                            key={child._key}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-2 text-sm text-foreground/80 hover:bg-muted hover:text-foreground"
                          >
                            {child.label}
                          </a>
                        ) : (
                          <Link
                            key={child._key}
                            href={href}
                            className="block px-4 py-2 text-sm text-foreground/80 hover:bg-muted hover:text-foreground"
                          >
                            {child.label}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Mobile menu button */}
          {navigation && navigation.length > 0 && (
            <button
              type="button"
              className="md:hidden p-2 text-foreground/80"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}
