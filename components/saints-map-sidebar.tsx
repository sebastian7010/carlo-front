"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Calendar, Filter } from "lucide-react"
import { saints } from "@/lib/saints-data"

export function SaintsMapSidebar() {
  const [selectedContinent, setSelectedContinent] = useState<string>("all")

  // Filtrar santos por continente
  const filteredSaints =
    selectedContinent === "all"
      ? saints
      : saints.filter((saint) => saint.continent.toLowerCase() === selectedContinent.toLowerCase())

  // Agrupar por continente para estadísticas
  const continentStats = saints.reduce(
    (acc, saint) => {
      const continent = saint.continent
      if (!acc[continent]) {
        acc[continent] = 0
      }
      acc[continent]++
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="font-playfair flex items-center gap-2 text-lg">
            <Filter className="h-5 w-5 text-primary" />
            Filtrar por Región
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedContinent} onValueChange={setSelectedContinent}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar continente" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los continentes</SelectItem>
              <SelectItem value="europa">Europa</SelectItem>
              <SelectItem value="asia">Asia</SelectItem>
              <SelectItem value="africa">África</SelectItem>
              <SelectItem value="america">América</SelectItem>
              <SelectItem value="oceania">Oceanía</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Estadísticas por continente */}
      <Card>
        <CardHeader>
          <CardTitle className="font-playfair text-lg">Estadísticas Globales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(continentStats).map(([continent, count]) => (
              <div key={continent} className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{continent}</span>
                <Badge variant="outline">{count} santos</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lista de santos filtrados */}
      <Card>
        <CardHeader>
          <CardTitle className="font-playfair text-lg">
            Santos {selectedContinent !== "all" && `de ${selectedContinent}`}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{filteredSaints.length} santos encontrados</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredSaints.map((saint) => (
              <div key={saint.id} className="flex gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image src={saint.image || "/placeholder.svg"} alt={saint.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">{saint.name}</h4>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    <MapPin className="h-3 w-3" />
                    <span>{saint.country}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                    <Calendar className="h-3 w-3" />
                    <span>{saint.feastDay}</span>
                  </div>
                  <Button asChild size="sm" variant="outline" className="w-full text-xs bg-transparent">
                    <Link href={`/santos/${saint.slug}`}>Ver Detalles</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Información adicional */}
      <Card>
        <CardHeader>
          <CardTitle className="font-playfair text-lg">¿Sabías que...?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              Los santos provienen de todos los continentes, mostrando la universalidad de la santidad en la Iglesia
              Católica.
            </p>
            <p>Cada marcador en el mapa representa el lugar de nacimiento o ministerio principal del santo.</p>
            <p>Puedes hacer clic en cualquier país para ver información detallada de sus santos.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
