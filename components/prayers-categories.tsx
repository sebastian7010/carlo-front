import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Shield, Sun, Anchor, Flame, Crown } from "lucide-react"
import { prayersData } from "@/lib/prayers-data"

const prayerCategories = [
  {
    title: "Protección y Fortaleza",
    icon: Shield,
    color: "text-secondary",
    occasions: ["Protección", "Fortaleza", "Valor", "Perseverancia"],
    description: "Oraciones para pedir protección divina y fortaleza espiritual",
  },
  {
    title: "Sanación y Consuelo",
    icon: Heart,
    color: "text-accent",
    occasions: ["Sanación", "Consuelo", "Enfermedad", "Dolor"],
    description: "Oraciones para momentos de enfermedad y necesidad de consuelo",
  },
  {
    title: "Gratitud y Alabanza",
    icon: Sun,
    color: "text-primary",
    occasions: ["Gratitud", "Alabanza", "Acción de gracias", "Bendición"],
    description: "Oraciones de agradecimiento y alabanza a Dios",
  },
  {
    title: "Guía y Sabiduría",
    icon: Anchor,
    color: "text-secondary",
    occasions: ["Guía", "Sabiduría", "Discernimiento", "Decisiones"],
    description: "Oraciones para pedir guía divina y sabiduría",
  },
  {
    title: "Intercesión y Petición",
    icon: Flame,
    color: "text-accent",
    occasions: ["Intercesión", "Petición", "Necesidades", "Familia"],
    description: "Oraciones de intercesión por otros y peticiones especiales",
  },
  {
    title: "Devoción Mariana",
    icon: Crown,
    color: "text-primary",
    occasions: ["Virgen María", "Rosario", "Advocaciones marianas"],
    description: "Oraciones dedicadas a la Santísima Virgen María",
  },
]

export function PrayersCategories() {
  return (
    <div className="space-y-8 mb-12">
      <div className="text-center">
        <h2 className="font-playfair text-3xl font-bold text-foreground mb-4">Categorías de Oraciones</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explora oraciones organizadas por temas y necesidades espirituales
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prayerCategories.map((category, index) => {
          const IconComponent = category.icon
          const categoryCount = prayersData.filter((prayer) =>
            category.occasions.some((occasion) => prayer.occasion.toLowerCase().includes(occasion.toLowerCase())),
          ).length

          return (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
                  <IconComponent className={`h-8 w-8 ${category.color}`} />
                </div>
                <CardTitle className="font-playfair text-xl">{category.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-1">
                    {category.occasions.slice(0, 3).map((occasion, occasionIndex) => (
                      <Badge key={occasionIndex} variant="outline" className="text-xs">
                        {occasion}
                      </Badge>
                    ))}
                    {category.occasions.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{category.occasions.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-3">{categoryCount} oraciones disponibles</p>
                    <Link
                      href={`/oraciones?categoria=${category.title.toLowerCase().replace(/\s+/g, "-")}`}
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full"
                    >
                      Explorar Oraciones
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
