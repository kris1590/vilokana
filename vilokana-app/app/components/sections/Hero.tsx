import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

type HeroProps = {
  headline: string
  subheadline?: string
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
}

export function Hero({ headline, subheadline, image }: HeroProps) {
  return (
    <section className="relative py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
          {headline}
        </h1>
        {subheadline && (
          <p className="text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto">
            {subheadline}
          </p>
        )}
        {image && (
          <div className="mt-12 relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={urlFor(image).width(1200).height(675).url()}
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
