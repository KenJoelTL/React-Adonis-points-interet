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
            <th className='clickable left' onClick={() => handleSort('arrondissement')}>Arrondissement</th>
            <th className='clickable left'>Type</th>
            <th className='clickable left' onClick={() => handleSort('nom_parc_lieu')}>Nom du lieu</th>
            <th className='clickable left' onClick={() => handleSort('intersection')}>Adresse</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {
            fontaineList.map(fontaine => {
              return (
                <tr key={fontaine.id}>
                  <td className='left'> {fontaine.arrondissement} </td>
                  <td className='left'> Fontaine à boire </td>
                  <td className='left'> {fontaine.nom_parc_lieu} </td>
                  <td className='left'> {fontaine.intersection} </td>
                  <td className='center'>
                    <button onClick={() => setShowDetails({ show: true, id: fontaine.id })}>
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
          {props.fontaineList.filter(fontaine => fontaine.id === showDetails.id).map((selectedFontaine, i) => (
            <div key={selectedFontaine.id + "-" + i}>
              <div>
                <SingleMarkerMap latitude={selectedFontaine.latitude} longitude={selectedFontaine.longitude} text={selectedFontaine.nom_parc_lieu} />
              </div>
              <h3>Point d'intérêt</h3>
              <div>
                <p>Proximité: {selectedFontaine.proximite_jeux_repere}</p>
                <p>Remarque: {selectedFontaine.remarque}</p>
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
