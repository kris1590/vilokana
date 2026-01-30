import Link from 'next/link'

type CallToActionProps = {
  heading: string
  text?: string
  button: {
    linkType: 'internal' | 'external'
    internalLink?: {
      _id: string
      slug: string
    }
    externalUrl?: string
    label: string
  }
}

export function CallToAction({ heading, text, button }: CallToActionProps) {
  const href =
    button.linkType === 'internal' && button.internalLink
      ? `/${button.internalLink.slug}`
      : button.externalUrl || '#'

  const isExternal = button.linkType === 'external'

  return (
    <section className="py-16 px-4 bg-primary/10">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
          {heading}
        </h2>
        {text && <p className="text-lg text-foreground/80 mb-8">{text}</p>}
        {isExternal ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            {button.label}
          </a>
        ) : (
          <Link
            href={href}
            className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            {button.label}
          </Link>
        )}
      </div>
    </section>
  )
}
