"use client"

import { useState } from "react"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { prayersData, type Prayer } from "@/lib/prayers-data"

export function PrayersSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSaint, setSelectedSaint] = useState("")
  const [selectedOccasion, setSelectedOccasion] = useState("")
  const [results, setResults] = useState<Prayer[]>([])
  const [isSearching, setIsSearching] = useState(false)

  // Obtener listas únicas para los filtros
  const saints = Array.from(new Set(prayersData.map((prayer) => prayer.saint))).sort()
  const occasions = Array.from(new Set(prayersData.map((prayer) => prayer.occasion))).sort()

  // Realizar búsqueda
  const handleSearch = () => {
    setIsSearching(true)

    setTimeout(() => {
      let filtered = prayersData

      if (searchTerm) {
        filtered = filtered.filter(
          (prayer) =>
            prayer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prayer.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prayer.saint.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      }

      if (selectedSaint) {
        filtered = filtered.filter((prayer) => prayer.saint === selectedSaint)
      }

      if (selectedOccasion) {
        filtered = filtered.filter((prayer) => prayer.occasion === selectedOccasion)
      }

      setResults(filtered)
      setIsSearching(false)
    }, 500)
  }

  // Limpiar filtros
  const clearFilters = () => {
    setSearchTerm("")
    setSelectedSaint("")
    setSelectedOccasion("")
    setResults([])
  }

  return (
    <div className="space-y-8 mb-12">
      {/* Buscador */}
      <Card>
        <CardHeader>
          <CardTitle className="font-playfair flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            Buscar Oraciones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar por título o contenido..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedSaint} onValueChange={setSelectedSaint}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar santo" />
              </SelectTrigger>
              <SelectContent>
                {saints.map((saint) => (
                  <SelectItem key={saint} value={saint}>
                    {saint}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedOccasion} onValueChange={setSelectedOccasion}>
              <SelectTrigger>
                <SelectValue placeholder="Ocasión" />
              </SelectTrigger>
              <SelectContent>
                {occasions.map((occasion) => (
                  <SelectItem key={occasion} value={occasion}>
                    {occasion}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button onClick={handleSearch} disabled={isSearching} className="flex-1">
                {isSearching ? "Buscando..." : "Buscar"}
              </Button>
              <Button variant="outline" onClick={clearFilters}>
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resultados de búsqueda */}
      {results.length > 0 && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="font-playfair text-2xl font-semibold text-foreground mb-2">Resultados de Búsqueda</h3>
            <p className="text-muted-foreground">Encontramos {results.length} oraciones</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.map((prayer) => (
              <Card key={prayer.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="font-playfair text-lg">{prayer.title}</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{prayer.saint}</Badge>
                    <Badge variant="outline">{prayer.occasion}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-muted-foreground italic leading-relaxed text-pretty mb-4">
                    "{prayer.text.length > 200 ? `${prayer.text.substring(0, 200)}...` : prayer.text}"
                  </blockquote>
                  {prayer.intention && (
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">Intención:</p>
                      <p className="text-sm text-muted-foreground">{prayer.intention}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
