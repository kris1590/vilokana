import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

type StoriesProps = {
  heading?: string
  stories: Array<{
    _key: string
    quote: string
    author?: string
    role?: string
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
  }>
}

export function Stories({ heading, stories }: StoriesProps) {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        {heading && (
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-foreground">
            {heading}
          </h2>
        )}
        <div className="space-y-12">
          {stories.map((story) => (
            <div key={story._key} className="space-y-6">
              <blockquote className="text-xl md:text-2xl font-medium text-foreground leading-relaxed">
                "{story.quote}"
              </blockquote>
              <div className="flex items-center gap-4">
                {story.image && (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={urlFor(story.image).width(128).height(128).url()}
                      alt={story.image.alt}
                      fill
                      className="object-cover"
                      placeholder={story.image.asset.metadata?.lqip ? 'blur' : 'empty'}
                      blurDataURL={story.image.asset.metadata?.lqip}
                    />
                  </div>
                )}
                <div>
                  {story.author && (
                    <p className="font-semibold text-foreground">{story.author}</p>
                  )}
                  {story.role && (
                    <p className="text-sm text-foreground/70">{story.role}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
