import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import { client } from '@/sanity/lib/client'
import { pageBySlugQuery } from '@/sanity/lib/queries'
import { SectionRenderer } from '@/app/components/SectionRenderer'
import { SiteProvider } from '@/app/components/SiteProvider'

export const revalidate = 60

type Props = {
  params: Promise<{
    slug: string[]
  }>
}

export async function generateStaticParams() {
  // Use regular client for static generation (draftMode not available here)
  const data = await client.fetch(
    /* groq */ `*[_type == "page" && defined(slug.current) && slug.current != ""] {
      "slug": slug.current
    }`
  )

  if (!data || !Array.isArray(data)) return []

  return data.map((page: { slug: string }) => ({
    slug: page.slug.split('/').filter(Boolean),
  }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const slugString = slug.join('/')

  const { data } = await sanityFetch({
    query: pageBySlugQuery,
    params: { slug: slugString },
    stega: false,
  })

  if (!data) {
    return {
      title: 'Page Not Found',
    }
  }

  return {
    title: data.seo?.title || data.title,
    description: data.seo?.description,
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const slugString = slug.length > 0 ? slug.join('/') : ''

  const { data } = await sanityFetch({
    query: pageBySlugQuery,
    params: { slug: slugString },
  })

  if (!data || !data.sections) {
    notFound()
  }

  return (
    <SiteProvider site={data.site || 'foundation'}>
      <main className="min-h-screen">
        <SectionRenderer sections={data.sections} />
      </main>
    </SiteProvider>
  )
}

