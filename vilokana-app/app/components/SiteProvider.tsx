'use client'

import { useEffect } from 'react'

type SiteProviderProps = {
  site: 'foundation' | 'school'
  children: React.ReactNode
}

export function SiteProvider({ site, children }: SiteProviderProps) {
  useEffect(() => {
    document.body.setAttribute('data-site', site)
    return () => {
      document.body.removeAttribute('data-site')
    }
  }, [site])

  return <>{children}</>
}
