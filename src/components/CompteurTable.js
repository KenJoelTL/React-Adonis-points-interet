import React from 'react'
import PropTypes from 'prop-types'
import StartEndDatePicker from './StartEndDatePicker';

function CompteurTable(props) {
  const [sort, setSort] = React.useState({column: '', direction: ''});
  const [showDetails, setShowDetails] = React.useState({ show: false, id: -1 });
  const [showResults, setShowResults] = React.useState({ show: false, id: -1 });

  const handleSort = (column) => {
    let direction = 'asc';
    if (sort.column === column && sort.direction === 'asc') {
      direction = 'desc';
    }
    setSort({ column, direction });
  };

  const sortedCompteurList = props.compteurList.sort((a, b) => {
    if (sort.direction === '') {
      return 0;
    } else if (sort.direction === 'asc') {
      if (a[sort.column] < b[sort.column]) {
        return -1;
      }
      if (a[sort.column] > b[sort.column]) {
        return 1;
      }
      return 0;
    } else {
      if (a[sort.column] < b[sort.column]) {
        return 1;
      }
      if (a[sort.column] > b[sort.column]) {
        return -1;
      }
      return 0;
    }
  });

  //For StartEndDatePicker
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  return (
    <div>
      <table>
        <thead>
          <th onClick={() => handleSort('ID')}>ID</th>
          <th onClick={() => handleSort('Nom')}>Nom du compteur</th>
          <th onClick={() => handleSort('Statut')}>Statut</th>
          <th onClick={() => handleSort('Annee_implante')}>Année Implanté</th>
          <th></th>
        </thead>

        <tbody>
          {
            sortedCompteurList.map(compteur => {
              return (
                <tr key={compteur.ID}>
                  <td> {compteur.ID} </td>
                  <td> {compteur.Nom} </td>
                  <td> {compteur.Statut} </td>
                  <td> {compteur.Annee_implante} </td>
                  <td>
                    <button onClick={() => setShowDetails({ show: true, id: compteur.ID })}>
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
          {props.compteurList.filter(compteur => compteur.ID === showDetails.id).map(selectedCompteur => (
            <div>
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
              <button onClick={() => setShowResults({ show: true, id: selectedCompteur.ID })}>
                      Afficher résultats
                    </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

CompteurTable.propTypes = {
  compteurList: PropTypes.array
}

export default CompteurTable
