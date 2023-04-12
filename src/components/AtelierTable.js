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
      const provider = new OpenStreetMapProvider();
      const adresse = atelier.item.Adresse
      console.log(adresse);

      const results = await provider.search({ query: adresse });
      console.log(results);
      setLatitude(results[0].y);
      setLongitude(results[0].x);
      setText(atelier.item.Adresse)
      setAnnee(atelier.item.Année)
      setRemarque(atelier.item.Remarque)

      //const { x, y } = results[0];
      //return { lat: results[0].y, lng: results[0].x };
      setShowDetails({ show: true, id: atelier.ID });
    } catch (error) {
      console.log(error);
      console.log("can't find addresse");
      return null;
    }
  };
  const handleMap = (item) => {
    setShowDetails({ show: false, id: item.ID });

    //geocodeAddress(atelier.Adresse);
    //console.log("nothing");
    console.log(item);

    getLatLngFromAddress(item);
    console.log(latitude);
    console.log(longitude);


    // setShowDetails({ show: true, id: atelier.ID });
    // console.log(showDetails.show);
    // console.log(showDetails.id);

  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th className='clickable left' onClick={() => handleSort('Nom')}>Nom</th>
            <th className='clickable left'>Type</th>
            <th className='clickable left' onClick={() => handleSort('Adresse')}>Adresse</th>
            <th className='clickable left' onClick={() => handleSort('Arrondissement')}>Arrondissement</th>
            <th className='clickable left' onClick={() => handleSort('Année')}>Année</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {
            atelierList.map(atelier => {
              return (
                <tr key={atelier.ID}>
                  <td className='left'> {atelier.Nom} </td>
                  <td className='left'> Atelier </td>
                  <td className='left'> {atelier.Adresse} </td>
                  <td className='left'> {atelier.Arrondissement} </td>
                  <td className='left'> {atelier.Année} </td>
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
                <SingleMarkerMap Latitude={latitude} Longitude={longitude} text={text}/>
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
          {props.atelierList.filter(atelier => atelier.ID === showDetails.id).map((selectedAtelier, i) => (
            <div key={selectedAtelier.ID + "-" + i}>
              <div>
                <SingleMarkerMap Latitude={latitude} Longitude={longitude} text={selectedAtelier.Adresse}/>
              </div>
              <h3>Point d'intérêt</h3>
              <div>
                <p>Proximité: {selectedAtelier.Année}</p>
                <p>Remarque: {selectedAtelier.Remarque}</p>
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
