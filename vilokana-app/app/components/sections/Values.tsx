type ValuesProps = {
  heading: string
  values: Array<{
    _key: string
    title: string
    description?: string
  }>
}

export function Values({ heading, values }: ValuesProps) {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        {heading && (
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-foreground">
            {heading}
          </h2>
        )}
        <div className="grid md:grid-cols-2 gap-8">
          {values.map((value) => (
            <div key={value._key} className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">{value.title}</h3>
              {value.description && (
                <p className="text-foreground/80 leading-relaxed">{value.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
