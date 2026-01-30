import Image from 'next/image'
import { PortableText } from 'next-sanity'
import { urlFor } from '@/sanity/lib/image'

type TextBlockProps = {
  content: any
  image?: {
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
  imagePosition?: 'left' | 'right'
}

const components = {
  block: {
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="text-3xl font-bold mt-8 mb-4 text-foreground">{children}</h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="text-2xl font-semibold mt-6 mb-3 text-foreground">{children}</h3>
    ),
    normal: ({ children }: { children: React.ReactNode }) => (
      <p className="mb-4 leading-relaxed text-foreground/90">{children}</p>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="border-l-4 border-primary pl-4 my-6 italic text-foreground/80">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }: { children: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    link: ({ children, value }: { children: React.ReactNode; value: { href: string } }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-primary underline hover:text-primary/80"
        >
          {children}
        </a>
      )
    },
  },
  list: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <ul className="list-disc ml-6 mb-4 space-y-2 text-foreground/90">{children}</ul>
    ),
  },
}

export function TextBlock({ content, image, imagePosition = 'right' }: TextBlockProps) {
  const hasImage = image && image.asset

  return (
    <section className="py-16 px-4">
      <div className={`max-w-6xl mx-auto ${hasImage ? 'grid md:grid-cols-2 gap-12 items-center' : ''}`}>
        {hasImage && imagePosition === 'left' && (
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src={urlFor(image).width(800).height(600).url()}
              alt={image.alt}
              fill
              className="object-cover"
              placeholder={image.asset.metadata?.lqip ? 'blur' : 'empty'}
              blurDataURL={image.asset.metadata?.lqip}
            />
          </div>
        )}
        <div className="prose prose-lg max-w-none">
          <PortableText value={content} components={components} />
        </div>
        {hasImage && imagePosition === 'right' && (
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src={urlFor(image).width(800).height(600).url()}
              alt={image.alt}
              fill
              className="object-cover"
              placeholder={image.asset.metadata?.lqip ? 'blur' : 'empty'}
              blurDataURL={image.asset.metadata?.lqip}
            />
          </div>
        )}
      </div>
    </section>
  )
}
