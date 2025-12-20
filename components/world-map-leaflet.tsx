"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Star } from "lucide-react"
import { saints } from "@/lib/saints-data"

interface CountryData {
  name: string
  saints: typeof saints
  coordinates: [number, number]
}

export function WorldMapLeaflet() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [map, setMap] = useState<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const countriesData: Record<string, CountryData> = {}
  saints.forEach((saint) => {
    if (!countriesData[saint.country]) {
      countriesData[saint.country] = {
        name: saint.country,
        saints: [],
        coordinates: saint.coordinates,
      }
    }
    countriesData[saint.country].saints.push(saint)
  })

  const countries = Object.values(countriesData)

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return

    // Cargar Leaflet dinámicamente
    const loadLeaflet = async () => {
      // Cargar CSS de Leaflet
      if (!document.querySelector('link[href*="leaflet"]')) {
        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        document.head.appendChild(link)
      }

      // Cargar JS de Leaflet
      if (!(window as any).L) {
        const script = document.createElement("script")
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        document.head.appendChild(script)

        await new Promise((resolve) => {
          script.onload = resolve
        })
      }

      const L = (window as any).L

      // Inicializar mapa
      const leafletMap = L.map(mapRef.current, {
        center: [20, 0],
        zoom: 2,
        minZoom: 1,
        maxZoom: 10,
        zoomControl: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        dragging: true,
      })

      // Agregar capa de OpenStreetMap de alta calidad
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(leafletMap)

      // Crear icono personalizado para santos
      const saintIcon = L.divIcon({
        className: "saint-marker",
        html: `
          <div class="saint-marker-content">
            <div class="saint-marker-inner">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="#D4AF37"/>
                <circle cx="12" cy="12" r="8" fill="#8B0000" stroke="#D4AF37" strokeWidth="2"/>
                <text x="12" y="16" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">S</text>
              </svg>
            </div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      })

      // Agregar marcadores para cada país con santos
      countries.forEach((country) => {
        const marker = L.marker(country.coordinates, { icon: saintIcon })
          .addTo(leafletMap)
          .bindPopup(`
            <div class="saint-popup">
              <h3 class="font-playfair text-lg font-semibold text-primary mb-2">${country.name}</h3>
              <p class="text-sm text-muted-foreground mb-3">
                <span class="inline-flex items-center gap-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="m22 21-3-3m0 0a5.5 5.5 0 1 0-7.78-7.78 5.5 5.5 0 0 0 7.78 7.78Z"/>
                  </svg>
                  ${country.saints.length} santos documentados
                </span>
              </p>
              <div class="flex flex-wrap gap-1 mb-3">
                ${country.saints
                  .slice(0, 3)
                  .map(
                    (saint) =>
                      `<span class="inline-block bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs">${saint.name}</span>`,
                  )
                  .join("")}
                ${
                  country.saints.length > 3
                    ? `<span class="inline-block border border-border px-2 py-1 rounded text-xs">+${country.saints.length - 3} más</span>`
                    : ""
                }
              </div>
              <button onclick="window.exploreCountry('${country.name}')" class="w-full bg-primary text-primary-foreground px-3 py-2 rounded text-sm hover:bg-primary/90 transition-colors">
                Explorar Santos
              </button>
            </div>
          `)

        marker.on("click", () => {
          setSelectedCountry(country.name)
        })
      })

      // Función global para explorar país
      ;(window as any).exploreCountry = (countryName: string) => {
        setSelectedCountry(countryName)
        // Aquí podrías agregar navegación a una página específica del país
      }

      setMap(leafletMap)
      setIsLoaded(true)
    }

    loadLeaflet()

    return () => {
      if (map) {
        map.remove()
      }
    }
  }, [])

  return (
    <div className="relative">
      <style jsx global>{`
        .saint-marker-content {
          position: relative;
          width: 32px;
          height: 32px;
        }
        
        .saint-marker-inner {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transition: transform 0.2s ease;
        }
        
        .saint-marker:hover .saint-marker-inner {
          transform: scale(1.2);
        }
        
        .saint-popup {
          min-width: 200px;
          font-family: inherit;
        }
        
        .leaflet-popup-content-wrapper {
          border-radius: 8px;
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
        }
        
        .leaflet-popup-tip {
          background: white;
        }
      `}</style>

      <div
        ref={mapRef}
        className="w-full h-96 rounded-lg overflow-hidden shadow-lg border border-border"
        style={{ minHeight: "400px" }}
      />

      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Cargando mapa mundial...</p>
          </div>
        </div>
      )}

      {selectedCountry && countriesData[selectedCountry] && (
        <div className="absolute top-4 left-4 right-4 z-[1000]">
          <Card className="bg-card/95 backdrop-blur-sm shadow-xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-playfair text-xl font-semibold text-primary flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {selectedCountry}
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setSelectedCountry(null)} className="h-8 w-8 p-0">
                  ✕
                </Button>
              </div>

              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  {countriesData[selectedCountry].saints.length} santos
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-4 w-4" />
                  Tradición católica
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {countriesData[selectedCountry].saints.slice(0, 4).map((saint) => (
                  <Badge key={saint.id} variant="secondary" className="text-xs">
                    {saint.name}
                  </Badge>
                ))}
                {countriesData[selectedCountry].saints.length > 4 && (
                  <Badge variant="outline" className="text-xs">
                    +{countriesData[selectedCountry].saints.length - 4} más
                  </Badge>
                )}
              </div>

              <Button className="w-full" size="sm">
                Ver todos los santos de {selectedCountry}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
