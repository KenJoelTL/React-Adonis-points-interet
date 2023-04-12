import React from 'react'
import PropTypes from 'prop-types'
import SingleMarkerMap from './SingleMarkerMap'

function FontaineTable(props) {

  const fontaineList = props.fontaineList
  const handleSort = (column) => { props.onSort(column) }

  const [showDetails, setShowDetails] = React.useState({ show: false, id: -1 })

  return (
    <>
      <table>
        <thead>
          <tr>
            <th className='clickable left' onClick={() => handleSort('Arrondissement')}>Arrondissement</th>
            <th className='clickable left'>Type</th>
            <th className='clickable left' onClick={() => handleSort('Nom_parc_lieu')}>Nom du lieu</th>
            <th className='clickable left' onClick={() => handleSort('Intersection')}>Adresse</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {
            fontaineList.map(fontaine => {
              return (
                <tr key={fontaine.ID}>
                  <td className='left'> {fontaine.Arrondissement} </td>
                  <td className='left'> Fontaine à boire </td>
                  <td className='left'> {fontaine.Nom_parc_lieu} </td>
                  <td className='left'> {fontaine.Intersection} </td>
                  <td className='center'>
                    <button onClick={() => setShowDetails({ show: true, id: fontaine.ID })}>
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
          {props.fontaineList.filter(fontaine => fontaine.ID === showDetails.id).map((selectedFontaine, i) => (
            <div key={selectedFontaine.ID + "-" + i}>
              <div>
                <SingleMarkerMap Latitude={selectedFontaine.Latitude} Longitude={selectedFontaine.Longitude} text={selectedFontaine.Nom_parc_lieu}/>
              </div>
              <h3>Point d'intérêt</h3>
              <div>
                <p>Proximité: {selectedFontaine.Proximité_jeux_repère}</p>
                <p>Remarque: {selectedFontaine.Remarque}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

FontaineTable.propTypes = {
  fontaineList: PropTypes.array
}

export default FontaineTable
