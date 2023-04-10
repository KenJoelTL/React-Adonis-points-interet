import React, { useEffect, useState } from 'react'
import CompteurTable from './CompteurTable'
import FontaineTable from './FontaineTable'
import SortingBox from './SortingBox'
import ButtonsSection from './ButtonsSection'
import FormulaireAjout from './FormulaireAjout'

function MainSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)
  const [compteurList, setCompteurList] = useState([])
  const [fontaineList, setFontaineList] = useState([])
  const [sort, setSort] = useState({ column: '', direction: '' })
  const [selectedBtnId, setSelectedBtnId] = useState(1)
  const [menuButtons] = useState([
    { id: 1, name: 'Comptages de vélos' },
    { id: 2, name: 'Points d\'intérêt' },
    { id: 3, name: 'Fontaines à boire' },
    { id: 4, name: 'Réparation vélos' },
    { id: 5, name: 'Ajouter un point d\'intérêt' }
  ])

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

  useEffect(() => {
    const compteurURL = "http://localhost:3333/gti525/v1/compteurs/"
    const fontaineURL = "http://localhost:3333/gti525/v1/fontaines/"

    setIsLoaded(true)
    fetch(compteurURL)
      .then(res => res.json())
      .then(
        (result) => { setCompteurList(result); setIsLoaded(false) },
        (error) => { setError(error); setIsLoaded(false) }
      )

    setIsLoaded(true)
    fetch(fontaineURL)
      .then(res => res.json())
      .then(
        (result) => { setFontaineList(result); setIsLoaded(false) },
        (error) => { setError(error); setIsLoaded(false) }
      )
  }, [])
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

      {selectedBtnId === 3 &&
        <div className='FontaineTable'>
          <h2>Point d'intérêt</h2>
          <div>
            <FontaineTable onSort={handleSort} fontaineList={sortedFontaineList} />
          </div>
        </div>
      }

      {selectedBtnId === 5 &&
        <div className='FormulaireAjout'>
          <h2>Ajouter un Point d'Intérêt</h2>
          <div>
            <FormulaireAjout />
          </div>
        </div>
      }

    </div>
  )
}

export default MainSection
