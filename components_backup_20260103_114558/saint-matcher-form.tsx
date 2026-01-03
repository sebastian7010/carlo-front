"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Loader2, Sparkles } from "lucide-react"
import { SaintMatcherResults } from "@/components/saint-matcher-results"

const personalityTraits = [
  "Compasivo",
  "Determinado",
  "Humilde",
  "Valiente",
  "Paciente",
  "Generoso",
  "Contemplativo",
  "Activo",
  "Estudioso",
  "Servicial",
  "Líder",
  "Obediente",
  "Creativo",
  "Disciplinado",
  "Alegre",
  "Serio",
  "Sociable",
  "Reservado",
  "Aventurero",
  "Prudente",
  "Optimista",
  "Realista",
  "Intuitivo",
  "Analítico",
]

const challenges = [
  "Impaciencia",
  "Orgullo",
  "Miedo",
  "Ira",
  "Pereza",
  "Envidia",
  "Dudas de fe",
  "Ansiedad",
  "Perfeccionismo",
  "Procrastinación",
  "Crítica excesiva",
  "Pesimismo",
  "Terquedad",
  "Impulsividad",
  "Desorganización",
  "Timidez",
  "Materialismo",
  "Vanidad",
]

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

export function SaintMatcherForm() {
  const [description, setDescription] = useState("")
  const [selectedTraits, setSelectedTraits] = useState<string[]>([])
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<MatchResult[]>([])
  const [showResults, setShowResults] = useState(false)

  const toggleTrait = (trait: string) => {
    setSelectedTraits((prev) => (prev.includes(trait) ? prev.filter((t) => t !== trait) : [...prev, trait]))
  }

  const toggleChallenge = (challenge: string) => {
    setSelectedChallenges((prev) =>
      prev.includes(challenge) ? prev.filter((c) => c !== challenge) : [...prev, challenge],
    )
  }

  const analyzePersonality = async () => {
    setIsAnalyzing(true)

    // Simular análisis de IA (en producción conectarías con una API real)
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Resultados simulados basados en la entrada del usuario
    const mockResults: MatchResult[] = [
      {
        saint: {
          name: "San Francisco de Asís",
          country: "Italia",
          feast: "4 de octubre",
          patronage: ["Animales", "Ecología", "Paz"],
          image: "/san-francisco-de-as-s-con-h-bito-franciscano-y-est.jpg",
        },
        matchPercentage: 92,
        reasons: [
          "Comparte tu amor por la naturaleza y los seres vulnerables",
          "Su humildad resuena con tu deseo de servir a otros",
          "Transformó sus desafíos personales en fortalezas espirituales",
        ],
        prayer: "San Francisco, ayúdame a encontrar la paz en la simplicidad y a ver a Cristo en toda la creación.",
      },
      {
        saint: {
          name: "Santa Teresa de Calcuta",
          country: "India",
          feast: "5 de septiembre",
          patronage: ["Pobres", "Misioneros", "Voluntarios"],
          image: "/santa-teresa-de-calcuta-con-sari-blanco-y-azul-cui.jpg",
        },
        matchPercentage: 88,
        reasons: [
          "Tu compasión hacia los necesitados refleja su ministerio",
          "Ambos encuentran fortaleza en la oración durante dificultades",
          "Su determinación ante obstáculos inspira tu perseverancia",
        ],
        prayer: "Santa Teresa, enséñame a amar sin límites y a servir con alegría a los más necesitados.",
      },
      {
        saint: {
          name: "San Martín de Porres",
          country: "Perú",
          feast: "3 de noviembre",
          patronage: ["Justicia social", "Trabajadores de la salud", "Peluqueros"],
          image: "/san-martin-de-porres.jpg",
        },
        matchPercentage: 85,
        reasons: [
          "Su dedicación al servicio médico resuena con tu vocación de ayuda",
          "Superó prejuicios sociales con humildad y perseverancia",
          "Su alegría en el trabajo diario inspira tu actitud positiva",
        ],
        prayer: "San Martín, ayúdame a servir con humildad y a encontrar a Dios en el trabajo cotidiano.",
      },
    ]

    setResults(mockResults)
    setIsAnalyzing(false)
    setShowResults(true)
  }

  const canAnalyze = description.trim().length > 20 || selectedTraits.length > 0 || selectedChallenges.length > 0

  if (showResults) {
    return <SaintMatcherResults results={results} onReset={() => setShowResults(false)} />
  }

  return (
    <div className="space-y-6">
      <Card className="border-amber-200">
        <CardHeader>
          <CardTitle className="font-playfair text-xl text-gray-900">Cuéntanos sobre ti</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Describe tu personalidad, valores y experiencias de vida
            </label>
            <Textarea
              placeholder="Ejemplo: Soy una persona que valora mucho la familia y la justicia. Me gusta ayudar a otros, pero a veces me cuesta perdonar. He pasado por momentos difíciles que me han hecho más fuerte..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-32 resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">Mínimo 20 caracteres para un análisis más preciso</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Selecciona tus principales cualidades
            </label>
            <div className="flex flex-wrap gap-2">
              {personalityTraits.map((trait) => (
                <Badge
                  key={trait}
                  variant={selectedTraits.includes(trait) ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    selectedTraits.includes(trait)
                      ? "bg-amber-600 hover:bg-amber-700"
                      : "hover:bg-amber-50 hover:border-amber-300"
                  }`}
                  onClick={() => toggleTrait(trait)}
                >
                  {trait}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Áreas donde buscas crecimiento</label>
            <div className="flex flex-wrap gap-2">
              {challenges.map((challenge) => (
                <Badge
                  key={challenge}
                  variant={selectedChallenges.includes(challenge) ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    selectedChallenges.includes(challenge)
                      ? "bg-red-600 hover:bg-red-700"
                      : "hover:bg-red-50 hover:border-red-300"
                  }`}
                  onClick={() => toggleChallenge(challenge)}
                >
                  {challenge}
                </Badge>
              ))}
            </div>
          </div>

          <Button
            onClick={analyzePersonality}
            disabled={!canAnalyze || isAnalyzing}
            className="w-full bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analizando tu personalidad...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Descubrir mis santos afines
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
