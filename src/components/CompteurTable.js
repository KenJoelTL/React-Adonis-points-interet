import React from 'react'
import PropTypes from 'prop-types'
import StartEndDatePicker from './StartEndDatePicker'
import BarChart from './BarChart'

function CompteurTable(props) {

  const compteurList = props.compteurList
  const handleSort = (column) => { props.onSort(column) }

  const [showDetails, setShowDetails] = React.useState({ show: false, id: -1 })
  const [showResults, setShowResults] = React.useState({ show: false, id: -1 })
  const [statList, setStatList] = React.useState([])

  //For StartEndDatePicker
  const [startDate, setStartDate] = React.useState(null)
  const [endDate, setEndDate] = React.useState(null)

  const handleStartDateChange = (date) => { setStartDate(date) }
  const handleEndDateChange = (date) => { setEndDate(date) }

  function closeStatPanel() {
    setShowDetails({ show: false, id: -1 })
    setShowResults({ show: false, id: -1 })
    setStatList([])
  }

  React.useEffect(() => {
    if (showResults.id == -1) return

    fetch("http://localhost:3333/gti525/v1/compteurs/" + showResults.id + "?debut=" + startDate + "&fin=" + endDate)
      .then(res => res.json())
      .then(
        (result) => { setStatList(Object.values(result)); 
          console.log(statList); 
        },
        (error) => { console.log(error) }
      )
  }, [showResults])

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
                  <td className='center'> IC </td>
                  <td className='right'>
                    <button onClick={() => setShowDetails({ show: true, id: compteur.ID }) }>
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
              <div id="statSortingTypeDiv">
                Trier par...
                <input type="radio" value="Jour" name="statSortingType" /> Jour
                <input type="radio" value="Semaine" name="statSortingType" /> Semaine
                <input type="radio" value="Mois" name="statSortingType" /> Mois
              </div>
              <button onClick={() => setShowResults({ show: true, id: selectedCompteur.ID })}>
                Afficher résultats
              </button>
              <button onClick={() => closeStatPanel()}>
                Retour
              </button>
              {statList.length > 0 && (
                <div style={{ width: 700 }}>
                  <p>DEBUG : {statList.length} rows of data</p>
                  <BarChart statList={statList} />
                </div>
              )}
            </div>
          ))}
        </div>

      )}
    </>
  )
}

CompteurTable.propTypes = {
  compteurList: PropTypes.array
}

export default CompteurTable
