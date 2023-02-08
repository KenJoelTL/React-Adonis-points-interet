import React from 'react'
import CompteurTable from './CompteurTable'
import FontaineTable from './FontaineTable'
import SortingBox from './SortingBox'
import ButtonsSection from './ButtonsSection'
import compteurList from '../data/compteurs.json'
import fontaineList from '../data/fontaines.json'

function MainSection() {

  const menuButtons = [
    { id: 1, name: 'Comptages de vélos' },
    { id: 2, name: 'Points d\'intérêt' },
    { id: 3, name: 'Fontaines à boire' },
    { id: 4, name: 'Réparation vélos' },
    { id: 5, name: 'Ajouter un point d\'intérêt' }
  ]

  const [sort, setSort] = React.useState({ column: '', direction: '' })
  const [selectedBtnId, setSelectedBtnId] = React.useState(1)

  const handleSort = (column) => {
    let direction = 'asc'
    if (sort.column === column && sort.direction === 'asc') {
      direction = 'desc'
    }
    setSort({ column, direction })
  }

  const sortListAlgo = (a, b) => {
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
  }

  const sortedCompteurList = compteurList.sort(sortListAlgo)
  const sortedFontaineList = fontaineList.sort(sortListAlgo)

  const handleMenuChange = (buttonId) => {
    setSelectedBtnId(buttonId)
  }

  return (
    <div className='MainSection'>
      <div className='ItemMenu'>
        <ButtonsSection menuButtons={menuButtons} selectedId={selectedBtnId} onClick={handleMenuChange} />
      </div>

      {selectedBtnId === 1 &&
        <div className='CompteurTable'>
          <div className='d-flex'>
            <h2>Comptages de vélos</h2>
            <SortingBox onSort={handleSort} />
          </div>
          <div>
            <CompteurTable onSort={handleSort} compteurList={sortedCompteurList} />
          </div>
        </div>
      }

      {selectedBtnId === 2 &&
        <div className='FontaineTable'>
          <h2>Point d'intérêt</h2>
          <div>
            <FontaineTable onSort={handleSort} fontaineList={sortedFontaineList} />
          </div>
        </div>
      }

    </div>
  )
}

export default MainSection
