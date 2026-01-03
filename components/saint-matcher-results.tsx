"use client";
import { T } from "@/components/t";


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Heart, RefreshCw, Share2, BookOpen } from "lucide-react"
import Image from "next/image"

interface MatchResult {
  saint: {
    name: string
    country: string
    feast: string
    patronage: string[]
    image: string
  }
  matchPercentage: number
  reasons: string[]
  prayer: string
}

interface SaintMatcherResultsProps {
  results: MatchResult[]
  onReset: () => void
}

export function SaintMatcherResults({ results, onReset }: SaintMatcherResultsProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full">
            <Heart className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-2">Tus Santos Afines</h2>
        <p className="text-gray-600 mb-6">Hemos encontrado santos que comparten características contigo</p>
        <Button onClick={onReset} variant="outline" className="mb-8 bg-transparent">
          <RefreshCw className="mr-2 h-4 w-4" />
          Hacer nuevo análisis
        </Button>
      </div>

      <div className="grid gap-6">
        {results.map((result, index) => (
          <Card
            key={index}
            className="overflow-hidden border-2 border-amber-200 bg-gradient-to-br from-white to-amber-50"
          >
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
                  <Image
                    src={result.saint.image || "/placeholder.svg"}
                    alt={result.saint.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="font-playfair text-xl text-gray-900">{result.saint.name}</CardTitle>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {result.matchPercentage}% compatible
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {result.saint.country} • Fiesta: {result.saint.feast}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {result.saint.patronage.map((patron) => (
                      <Badge key={patron} variant="outline" className="text-xs">
                        {patron}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <Progress value={result.matchPercentage} className="mt-4" />
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Por qué conectas con {result.saint.name.split(" ")[1] || result.saint.name}
                </h4>
                <ul className="space-y-1">
                  {result.reasons.map((reason, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start">
                      <span className="text-amber-600 mr-2">•</span>
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-red-50 p-4 rounded-lg border border-amber-200">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Heart className="mr-2 h-4 w-4 text-red-500" />
                  Oración sugerida
                </h4>
                <p className="text-sm text-gray-700 italic leading-relaxed">"{result.prayer}"</p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Share2 className="mr-2 h-3 w-3" />
                  Compartir resultado
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <BookOpen className="mr-2 h-3 w-3" />
                  Leer biografía completa
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6 text-center">
          <h3 className="font-playfair text-lg font-semibold text-gray-900 mb-2">Continúa tu camino espiritual</h3>
          <p className="text-sm text-gray-600 mb-4">
            Estos santos pueden ser tus compañeros de oración y guías en tu crecimiento personal
          </p>
          <div className="flex justify-center gap-2">
            <Button variant="outline" size="sm">
              Ver más oraciones
            </Button>
            <Button variant="outline" size="sm">
              <T k="footer.explore" /> otros santos
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
