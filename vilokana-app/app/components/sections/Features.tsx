import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

type FeaturesProps = {
  heading?: string
  features: Array<{
    _key: string
    title: string
    description?: string
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

export function Features({ heading, features }: FeaturesProps) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {heading && (
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-foreground">
            {heading}
          </h2>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature._key} className="space-y-4">
              {feature.image && (
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src={urlFor(feature.image).width(600).height(450).url()}
                    alt={feature.image.alt}
                    fill
                    className="object-cover"
                    placeholder={feature.image.asset.metadata?.lqip ? 'blur' : 'empty'}
                    blurDataURL={feature.image.asset.metadata?.lqip}
                  />
                </div>
              )}
              <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
              {feature.description && (
                <p className="text-foreground/80 leading-relaxed">{feature.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
