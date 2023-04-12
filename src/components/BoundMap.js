import React from 'react'
import { useMap } from 'react-leaflet/hooks'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

function BoundMap(props) {
  const compteurList = props.compteurList
  const mapRef = useMap()
  const compteurCoords = compteurList.map((compteur) => [compteur.latitude, compteur.longitude])
  const bounds = L.latLngBounds(compteurCoords).pad(0.1)
  mapRef.fitBounds(bounds)

  return null
}

export default BoundMap
