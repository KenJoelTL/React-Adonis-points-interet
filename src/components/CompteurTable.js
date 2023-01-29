import React from 'react'
import PropTypes from 'prop-types'

function CompteurTable(props) {
  return (
    <table>
      <thead>
        <th>ID</th>
        <th>Nom du compteur</th>
        <th>Statut</th>
        <th>Année Implanté</th>
        <th></th>
      </thead>

      <tbody>
        {
          props.compteurList.map(compteur => {
            return (
              <tr>
                <td> {compteur.ID} </td>
                <td> {compteur.Nom} </td>
                <td> {compteur.Statut} </td>
                <td> {compteur.Annee_implante} </td>
                <td></td>
              </tr>)
          })
        }
      </tbody>
    </table>
  )
}

CompteurTable.propTypes = {
  compteurList: PropTypes.array
}

export default CompteurTable
