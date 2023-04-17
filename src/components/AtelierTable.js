import React from 'react'
import PropTypes from 'prop-types'
import SingleMarkerMap from './SingleMarkerMap'
import { OpenStreetMapProvider } from 'leaflet-geosearch'
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'
import 'leaflet-control-geocoder/dist/Control.Geocoder.js'

function AtelierTable(props) {

  const atelierList = props.atelierList
  const handleSort = (column) => { props.onSort(column) }

  const [showDetails, setShowDetails] = React.useState({ show: false, id: -1 })
  const [latitude, setLatitude] = React.useState(null)
  const [longitude, setLongitude] = React.useState(null)
  const [text, setText] = React.useState(null)
  const [annee, setAnnee] = React.useState(null)
  const [remarque, setRemarque] = React.useState(null)


  const getLatLngFromAddress = async (atelier) => {
    //console.log(address);

    try {
      const provider = new OpenStreetMapProvider()
      const adresse = atelier.item.adresse
      console.log(adresse)

      const results = await provider.search({ query: adresse })
      console.log(results)
      setLatitude(results[0].y)
      setLongitude(results[0].x)
      setText(atelier.item.adresse)
      setAnnee(atelier.item.annee)
      setRemarque(atelier.item.remarque)

      //const { x, y } = results[0];
      //return { lat: results[0].y, lng: results[0].x };
      setShowDetails({ show: true, id: atelier.id })
    } catch (error) {
      console.log(error)
      console.log("can't find addresse")
      return null
    }
  }
  const handleMap = (item) => {
    setShowDetails({ show: false, id: item.id })

    //geocodeAddress(atelier.adresse);
    //console.log("nothing");
    console.log(item)

    getLatLngFromAddress(item)
    console.log(latitude)
    console.log(longitude)


    // setShowDetails({ show: true, id: atelier.id });
    // console.log(showDetails.show);
    // console.log(showDetails.id);

  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th className='clickable left' onClick={() => handleSort('nom_parc_lieu')}>Nom</th>
            <th className='clickable left'>Type</th>
            <th className='clickable left' onClick={() => handleSort('adresse')}>Adresse</th>
            <th className='clickable left' onClick={() => handleSort('arrondissement')}>Arrondissement</th>
            <th className='clickable left' onClick={() => handleSort('annee')}>Année</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {
            atelierList.map(atelier => {
              return (
                <tr key={atelier.id}>
                  <td className='left'> {atelier.nom_parc_lieu} </td>
                  <td className='left'> Atelier </td>
                  <td className='left'> {atelier.adresse} </td>
                  <td className='left'> {atelier.arrondissement} </td>
                  <td className='left'> {atelier.annee} </td>
                  <td className='center'>
                    <button onClick={() => handleMap({ item: atelier })}>
                      Map
                    </button>
                  </td>
                </tr>)
            })
          }
        </tbody>
      </table>
      {showDetails.show && (
        <div>
          <div>
            <SingleMarkerMap latitude={latitude} longitude={longitude} text={text} />
          </div>
          <h3>Point d'intérêt</h3>
          <div>
            <p>Proximité: {annee}</p>
            <p>Remarque: {remarque}</p>
          </div>
        </div>
      )}
      {showDetails.show && (
        <div>
          {props.atelierList.filter(atelier => atelier.id === showDetails.id).map((selectedAtelier, i) => (
            <div key={selectedAtelier.id + "-" + i}>
              <div>
                <SingleMarkerMap latitude={latitude} longitude={longitude} text={selectedAtelier.adresse} />
              </div>
              <h3>Point d'intérêt</h3>
              <div>
                <p>Proximité: {selectedAtelier.annee}</p>
                <p>Remarque: {selectedAtelier.remarque}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

AtelierTable.propTypes = {
  atelierList: PropTypes.array
}

export default AtelierTable
