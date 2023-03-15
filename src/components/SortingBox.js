import React from 'react'

function SortingBox(props) {

  const handleSort = (column) => {
    props.onSort(column)
  }

  return (
    <div className='d-flex ml-auto SortingBox'>
      <div>Trier par: </div>
      <ul>
        <li className='clickable' onClick={() => { handleSort('ID') }}> ID</li>
        <li className='clickable' onClick={() => { handleSort('Nom') }}> Nom</li>
        <li className='clickable' onClick={() => { handleSort('Statut') }}> Statut</li>
        <li className='clickable' onClick={() => { handleSort('Annee_implante') }}> Année Implanté</li>
      </ul>
    </div>
  )
}

export default SortingBox
