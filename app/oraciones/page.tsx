import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PrayersIntroduction } from "@/components/prayers-introduction"
import { PrayersSearch } from "@/components/prayers-search"
import { PrayersCategories } from "@/components/prayers-categories"
import { FeaturedPrayers } from "@/components/featured-prayers"

export default function OracionesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <div className="ornate-divider w-32 mx-auto mb-8"></div>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">Biblioteca de Oraciones</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Descubre la riqueza espiritual de las oraciones de los santos. Encuentra la oración perfecta para cada
            momento de tu vida y cada necesidad de tu alma.
          </p>
          <div className="ornate-divider w-32 mx-auto mt-8"></div>
        </div>

        <PrayersIntroduction />
        <PrayersSearch />
        <PrayersCategories />
        <FeaturedPrayers />
      </div>
      <Footer />
    </div>
  )
}
