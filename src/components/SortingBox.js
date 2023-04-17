import React from 'react'

function SortingBox(props) {

  const handleSort = (column) => {
    props.onSort(column)
  }

  return (
    <div className='d-flex ml-auto SortingBox'>
      <div>Trier par: </div>
      <ul>
        <li className='clickable' onClick={() => { handleSort('id') }}> ID</li>
        <li className='clickable' onClick={() => { handleSort('nom') }}> Nom</li>
        <li className='clickable' onClick={() => { handleSort('statut') }}> Statut</li>
        <li className='clickable' onClick={() => { handleSort('annee_implante') }}> Année Implanté</li>
      </ul>
    </div>
  )
}

export default SortingBox
