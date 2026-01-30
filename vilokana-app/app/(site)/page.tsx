import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import { pageBySlugQuery } from '@/sanity/lib/queries'
import { SectionRenderer } from '@/app/components/SectionRenderer'
import { SiteProvider } from '@/app/components/SiteProvider'

export async function generateMetadata() {
  const { data } = await sanityFetch({
    query: pageBySlugQuery,
    params: { slug: '' },
    stega: false,
  })

  if (!data) {
    return {
      title: 'Vilokana Foundation',
    }
  }

  return {
    title: data.seo?.title || data.title,
    description: data.seo?.description,
  }
}

export default async function Home() {
  const { data } = await sanityFetch({
    query: pageBySlugQuery,
    params: { slug: '' },
  })

  if (!data || !data.sections) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome</h1>
          <p className="text-lg text-foreground/80">
            Create a page with an empty slug in Sanity Studio to set the home page.
          </p>
        </div>
      </main>
    )
  }

  return (
    <SiteProvider site={data.site || 'foundation'}>
      <main className="min-h-screen">
        <SectionRenderer sections={data.sections} />
      </main>
    </SiteProvider>
  )
}

