import React from 'react';
import { useMap } from 'react-leaflet/hooks'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

function BoundMap(props) {
  const compteurList = props.compteurList;
  const mapRef = useMap()
  const compteurCoords = compteurList.map((compteur) => [compteur.Latitude, compteur.Longitude]);
  const bounds = L.latLngBounds(compteurCoords).pad(0.1);
  mapRef.fitBounds(bounds)

  const openSelectedCompteurPopup = () => {
    console.log(props.selectedCompteur.ID);
    const layerContainer = mapRef.getContainer().querySelector('.leaflet-pane.leaflet-marker-pane');
    const markers = layerContainer.getElementsByTagName('img');
    Array.from(markers).forEach((marker) => {
      console.log("test");

      const id = marker.getAttribute('data-id');
      if (id === props.selectedCompteur.ID) {
        marker.parentNode.click();
      }
    });
  };

  openSelectedCompteurPopup();
  return null
}

export default BoundMap;
