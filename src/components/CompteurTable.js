import React from 'react'
import PropTypes from 'prop-types'
import StartEndDatePicker from './StartEndDatePicker'
import BarChart from './BarChart'
import Overlay from './Overlay'
import Map from './Map'
import 'leaflet/dist/leaflet.css'

function CompteurTable(props) {

  const compteurList = props.compteurList
  const handleSort = (column) => { props.onSort(column) }

  const [showDetails, setShowDetails] = React.useState({ show: false, id: -1 })
  const [timeGrouping, setTimeGrouping] = React.useState('day')
  const [statList, setStatList] = React.useState([])

  //For StartEndDatePicker
  const [startDate, setStartDate] = React.useState(null)
  const [endDate, setEndDate] = React.useState(null)
  const handleStartDateChange = (date) => { setStartDate(date) }
  const handleEndDateChange = (date) => { setEndDate(date) }

  function openStatsPanel(compteurID) {
    setShowDetails({ show: true, id: compteurID })
    setStatList([])
  }

  function updateTimeGrouping(selectedTimeGrouping) {
    setTimeGrouping(selectedTimeGrouping)
  }

  function fetchResults() {
    fetch("http://localhost:3333/gti525/v1/compteurs/" + showDetails.id + "/passages?debut=" + startDate + "&fin=" + endDate)
      .then(res => res.json())
      .then(
        (result) => {
          let stats = Object.values(result)
          setStatList(stats)
        },
        (error) => { console.log(error) }
      )
  }

  function closeStatsPanel() {
    setShowDetails({ show: false, id: -1 })
    setStatList([])
  }

  //For Overlay
  const [showOverlay, setShowOverlay] = React.useState({ show: false, id: -1 })
  const handleClose = () => {
    setShowOverlay(false)
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th className='clickable left' onClick={() => handleSort('ID')}>ID</th>
            <th className='clickable left' onClick={() => handleSort('Nom')}>Nom du compteur</th>
            <th className='clickable center' onClick={() => handleSort('Statut')}>Statut</th>
            <th className='clickable center' onClick={() => handleSort('Annee_implante')}>Année Implanté</th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {
            compteurList.map(compteur => {
              return (
                <tr key={compteur.ID}>
                  <td className='left'> {compteur.ID} </td>
                  <td className='left'> {compteur.Nom} </td>
                  <td className='center'> {compteur.Statut} </td>
                  <td className='center'> {compteur.Annee_implante} </td>
                  <td className='center'>
                    <button onClick={() => setShowOverlay({ show: true, id: compteur.ID })}>Map</button>
                  </td>
                  <td className='right'>
                    <button onClick={() => openStatsPanel(compteur.ID)}>
                      Statistiques
                    </button>
                  </td>
                </tr>)
            })
          }
        </tbody>
      </table>
      {showDetails.show && (
        <div>
          {props.compteurList.filter(compteur => compteur.ID === showDetails.id).map((selectedCompteur, i) => (
            <div key={selectedCompteur.ID + "-" + i}>
              <h3>Statistiques du compteur: {selectedCompteur.ID}</h3>
              <p>Plage de dates</p>
              <div>
                <StartEndDatePicker
                  startDate={startDate}
                  endDate={endDate}
                  onStartDateChange={handleStartDateChange}
                  onEndDateChange={handleEndDateChange}
                />
              </div>
              <div id="timeGroupingDiv" >
                Trier par...
                <input type="radio" name="timeGroupingButton" onChange={() => updateTimeGrouping('day')} /> Jour
                <input type="radio" name="timeGroupingButton" onChange={() => updateTimeGrouping('week')} /> Semaine
                <input type="radio" name="timeGroupingButton" onChange={() => updateTimeGrouping('month')} /> Mois
              </div>
              <button onClick={() => fetchResults()}>
                Afficher résultats
              </button>
              <button onClick={() => closeStatsPanel()}>
                Retour
              </button>
              {statList.length > 0 && (
                <div style={{ width: 700 }}>
                  <BarChart statList={statList} timeGrouping={timeGrouping} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {showOverlay.show && (
        <Overlay onClose={handleClose}>
          {props.compteurList.filter(compteur => compteur.ID === showOverlay.id).map((selectedCompteur, i) => (
            <Map compteurList={props.compteurList} selectedCompteur={selectedCompteur} />
          ))}
        </Overlay>
      )}
    </>
  )
}

CompteurTable.propTypes = {
  compteurList: PropTypes.array
}

export default CompteurTable
