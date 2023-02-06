import React from 'react'
import CompteurTable from './CompteurTable'
import SortingBox from './SortingBox'
import ButtonsSection from './ButtonsSection'
import compteurList from '../data/compteurs.json'

function MainSection() {

  const menuButtons = [
    { id: 1, name: 'Comptages de vélos' },
    { id: 2, name: 'Points d\'intérêt' },
    { id: 3, name: 'Fontaines à boire' },
    { id: 4, name: 'Réparation vélos' },
    { id: 5, name: 'Ajouter un point d\'intérêt' }
  ]

  const [sort, setSort] = React.useState({ column: '', direction: '' })

  const handleSort = (column) => {
    let direction = 'asc'
    if (sort.column === column && sort.direction === 'asc') {
      direction = 'desc'
    }
    setSort({ column, direction })
  }

  const sortedCompteurList = compteurList.sort((a, b) => {
    if (sort.direction === '') {
      return 0
    } else if (sort.direction === 'asc') {
      if (a[sort.column] < b[sort.column]) {
        return -1
      }
      if (a[sort.column] > b[sort.column]) {
        return 1
      }
      return 0
    } else {
      if (a[sort.column] < b[sort.column]) {
        return 1
      }
      if (a[sort.column] > b[sort.column]) {
        return -1
      }
      return 0
    }
  })

  return (
    <div className='MainSection'>
      <div className='ItemMenu'>
        <ButtonsSection menuButtons={menuButtons} />
      </div>


      <div className='CompteurTable'>

        <div className='d-flex'>
          <h1>Comptages de vélos</h1>
          <SortingBox onSort={handleSort} />
        </div >
        <div>
          <CompteurTable onSort={handleSort} compteurList={sortedCompteurList} />
        </div >

      </div >
    </div >
  )
}

export default MainSection
