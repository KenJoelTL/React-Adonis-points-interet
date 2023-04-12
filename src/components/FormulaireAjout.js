import React from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'

function FormulaireAjout() {
  const [lieu, setLieu] = React.useState('')
  const [addr, setAddr] = React.useState('')
  const [arron, setArron] = React.useState('')
  const [annee, setAnnee] = React.useState('2023')
  const [selectedType, setSelectedType] = React.useState('atelier')
  const [lon, setLon] = React.useState('-73.56292784716062')
  const [lat, setLat] = React.useState('45.49459670781232')
  const [remarque, setRemarque] = React.useState('')
  const [showMap, setShowMap] = React.useState(false)

  function handleAnnuler() {
    setLieu('')
    setAddr('')
    setArron('')
    setSelectedType('atelier')
    setAnnee('2023')
    setLon('')
    setLat('')
    setRemarque('')
  }

  async function handleEnvoyerFontaine() {
    //console.log("TODO : Ajouter les données dans la BD (???)")
    const newPoint = {
      nom_parc_lieu: lieu,
      adresse: addr,
      arrondissement: arron,
      date_installation: annee,
      longitude: lon,
      latitude: lat,
      remarque: remarque,
      type: selectedType.toLowerCase(),
    }
    console.log(newPoint)
    const response = await fetch('http://127.0.0.1:3333/gti525/v1/pointsdinteret', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPoint),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error(error)
    } else {
      const point = await response.json()
      console.log('New point added:', point)
      handleAnnuler()
    }
  }

  async function handleEnvoyerAtelier() {
    //console.log("TODO : Ajouter les données dans la BD (???)")
    const newPoint = {
      nom_parc_lieu: lieu,
      adresse: addr,
      arrondissement: arron,
      annee: annee,
      remarque: remarque,
      type: selectedType.toLowerCase(),
    }
    console.log(newPoint)
    const response = await fetch('http://127.0.0.1:3333/gti525/v1/pointsdinteret', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPoint),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error(error)
    } else {
      const point = await response.json()
      console.log('New point added:', point)
      handleAnnuler()
    }
  }

  return (
    <>
      {selectedType == 'fontaine' && (
        <div>
          <label>Nom du lieu : </label ><input type="text" value={lieu} onChange={e => setLieu(e.target.value)} /><br />
          <label>Arrondissement : </label ><input type="text" value={arron} onChange={e => setArron(e.target.value)} /><br />
          <label>Type : <select value={selectedType} onChange={e => setSelectedType(e.target.value)}>
            <option value='atelier'>Atelier de réparation de vélos</option>
            <option value='fontaine'>Fontaine à boire</option>
          </select></label ><br />
          <label>Année d'établissement : </label>
          <input
            type="number"
            min="0"
            value={annee}
            onChange={e => setAnnee(Math.abs(parseInt(e.target.value)))}
          />
          <br />
          {selectedType == 'fontaine' && (
            <><label>Coordonnées géographiques : </label>
              <button onClick={() => setShowMap(true)}>Sélectionner sur la carte</button>
              <br />
              {showMap && (
                <MapContainer center={[lat, lon]} zoom={13} scrollWheelZoom={true} style={{ height: '400px', width: '400px' }}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[lat, lon]} draggable={true} eventHandlers={{ dragend: handleMarkerDrag }} />
                  <MapEvents />
                </MapContainer>
              )}
              <br />
              <label> ou Longitude : </label><input type="text" value={lon} onChange={e => setLon(e.target.value)} />
              <label> Latitude : </label><input type="text" value={lat} onChange={e => setLat(e.target.value)} />
              <br /></>
          )}
          <label>Remarque : </label ><input type="text" value={remarque} onChange={e => setRemarque(e.target.value)} /><br />
          <button type="button" onClick={() => handleAnnuler()}>Annuler</button>


          <button type="button" onClick={() => handleEnvoyerFontaine()}>Envoyer</button>

        </div>
      )}
      {selectedType == 'atelier' && (
        <div>
          <label>Nom du lieu : </label ><input type="text" value={lieu} onChange={e => setLieu(e.target.value)} /><br />
          <label>Adresse : </label ><input type="text" value={addr} onChange={e => setAddr(e.target.value)} /><br />
          <label>Arrondissement : </label ><input type="text" value={arron} onChange={e => setArron(e.target.value)} /><br />
          <label>Type : <select value={selectedType} onChange={e => setSelectedType(e.target.value)}>
            <option value='atelier'>Atelier de réparation de vélos</option>
            <option value='fontaine'>Fontaine à boire</option>
          </select></label ><br />
          <label>Année d'établissement : </label>
          <input
            type="number"
            min="0"
            value={annee}
            onChange={e => setAnnee(Math.abs(parseInt(e.target.value)))}
          />
          <br />
          <label>Remarque : </label ><input type="text" value={remarque} onChange={e => setRemarque(e.target.value)} /><br />
          <button type="button" onClick={() => handleAnnuler()}>Annuler</button>
          <button type="button" onClick={() => handleEnvoyerAtelier()}>Envoyer</button>

        </div>
      )}
    </>
  )
  function MapEvents() {
    const map = useMapEvents({
      click: (e) => {
        setLat(e.latlng.lat)
        setLon(e.latlng.lng)
        setShowMap(false)
      },
    })

    return null
  }

  function handleMarkerDrag(e) {
    setLat(e.target.getLatLng().lat)
    setLon(e.target.getLatLng().lng)
  }
}


export default FormulaireAjout