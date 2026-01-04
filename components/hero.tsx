"use client"

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center bg-gradient-to-b from-background via-secondary/5 to-background overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <p className="text-sm font-semibold tracking-widest text-accent uppercase mb-4">Premium Collection</p>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-serif font-bold text-foreground text-pretty leading-tight mb-6">
            ApnaMart
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Discover curated premium products crafted for those who appreciate quality, elegance, and exceptional
            design.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
          <a
            href="#products"
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Explore Products
          </a>
          <a
            href="#products"
            className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
          >
            Learn More
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}
