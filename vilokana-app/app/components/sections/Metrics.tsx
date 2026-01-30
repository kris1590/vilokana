type MetricsProps = {
  heading?: string
  metrics: Array<{
    _key: string
    value: string
    label: string
  }>
}

export function Metrics({ heading, metrics }: MetricsProps) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {heading && (
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-foreground">
            {heading}
          </h2>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((metric) => (
            <div key={metric._key} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {metric.value}
              </div>
              <div className="text-foreground/80">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
