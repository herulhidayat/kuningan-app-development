import { useEffect, useRef } from 'react'
import L from 'leaflet'
import jabarKecamatanJson from '../../public/json/jabar-kec.json'
import { GeoJsonObject } from 'geojson'

const Map = ({ className }: { className?: string }) => {
  const mapRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (mapRef.current === null) {
      mapRef.current = L.map('map', {
        // Disable world wrapping to prevent map from repeating
        worldCopyJump: false,
        // Zoom limits to prevent going too far out
        minZoom: 11,
        maxZoom: 15, // Adjust as needed
      }).setView([-6.9731, 108.5927], 11) // Coordinates for Kabupaten Kuningan

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current)

      const geoJsonLayer = L.geoJSON(jabarKecamatanJson as GeoJsonObject, {
        style: (feature) => ({
          color: feature?.properties?.color || 'blue',
          weight: 2,
          opacity: 1,
        }),
        onEachFeature: (feature, layer) => {
          if (feature.properties && feature.properties.KECAMATAN) {
            layer.bindTooltip(
              `
                <div style="font-weight: bold; font-size: 16px;">
                  ${feature.properties.KECAMATAN}
                </div>
              `,
              {
                permanent: false,
                direction: 'top',
                opacity: 1,
              }
            )
          }
        },
      }).addTo(mapRef.current)

      // Fit the map to the GeoJSON bounds *after* adding it to the map
      // if (geoJsonLayer) {
      //   mapRef.current.fitBounds(geoJsonLayer.getBounds())
      // }

      // Optional: Set max bounds to prevent panning outside Indonesia
      if (geoJsonLayer) {
        mapRef.current.setMaxBounds(geoJsonLayer.getBounds().pad(0.2)) // Pad for a little buffer
      }
    }
  }, [])

  return <div id="map" className={className}></div>
}

export default Map
