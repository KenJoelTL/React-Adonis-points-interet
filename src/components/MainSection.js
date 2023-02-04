import React from 'react'
import CompteurTable from './CompteurTable'
import { useState } from 'react'
import SortingBox from './SortingBox'

function MainSection() {
  const [compteurList, setCompteurList] = useState([
    {
      ID: 100041114,
      Ancien_ID: "",
      Nom: "Eco-Display Parc Stanley",
      Statut: "Actif",
      Latitude: 45.55759296561201,
      Longitude: -73.67322198070093,
      Annee_implante: 2018
    },
    {
      ID: 100002880,
      Ancien_ID: 10,
      Nom: "Pont Jacques-Cartier",
      Statut: "Actif",
      Latitude: 45.5255082563413,
      Longitude: -73.5544220271119,
      Annee_implante: 2011
    },
    {
      ID: 100003032,
      Ancien_ID: 3,
      Nom: "Berri1",
      Statut: "Actif",
      Latitude: 45.516216,
      Longitude: -73.56297,
      Annee_implante: 2010
    },
    {
      ID: 100003034,
      Ancien_ID: 6,
      Nom: "Rachel / Papineau",
      Statut: "Actif",
      Latitude: 45.53044782912952,
      Longitude: -73.56954036492331,
      Annee_implante: 2007
    },
    {
      ID: 100003039,
      Ancien_ID: 5,
      Nom: "Maisonneuve_2 (@Peel)",
      Statut: "Actif",
      Latitude: 45.500507,
      Longitude: -73.57497,
      Annee_implante: 2008
    },
    {
      ID: 100003040,
      Ancien_ID: 12,
      Nom: "Pierre-Dupuy",
      Statut: "Actif",
      Latitude: 45.50127,
      Longitude: -73.54441,
      Annee_implante: 2010
    },
    {
      ID: 100003041,
      Ancien_ID: 8,
      Nom: "CSC (Côte Sainte-Catherine)_EnMaintenance",
      Statut: "En maintenance",
      Latitude: 45.5149,
      Longitude: -73.607506,
      Annee_implante: 2010
    },
    {
      ID: 100003042,
      Ancien_ID: 22,
      Nom: "Parc",
      Statut: "Actif",
      Latitude: 45.51385,
      Longitude: -73.58151,
      Annee_implante: 2010
    },
    {
      ID: 100004575,
      Ancien_ID: 2,
      Nom: "Brébeuf",
      Statut: "Actif",
      Latitude: 45.527496,
      Longitude: -73.57432,
      Annee_implante: 2009
    },
    {
      ID: 100007390,
      Ancien_ID: 37,
      Nom: "Eco-Display - Métro Laurier",
      Statut: "Actif",
      Latitude: 45.5277722028042,
      Longitude: -73.5888323717438,
      Annee_implante: 2013
    },
    {
      ID: 100011747,
      Ancien_ID: 14,
      Nom: "Saint-Antoine_En Maintenance",
      Statut: "En maintenance",
      Latitude: 45.50625,
      Longitude: -73.557785,
      Annee_implante: 2013
    },
    {
      ID: 100011748,
      Ancien_ID: 36,
      Nom: "René-Lévesque",
      Statut: "Actif",
      Latitude: 45.516968,
      Longitude: -73.55404,
      Annee_implante: 2013
    },
    {
      ID: 100011783,
      Ancien_ID: 17,
      Nom: "Maisonneuve_3 (@Marcil)",
      Statut: "Actif",
      Latitude: 45.470493,
      Longitude: -73.609566,
      Annee_implante: 2013
    },
    {
      ID: 100012217,
      Ancien_ID: 23,
      Nom: "Rachel / HôteldeVille",
      Statut: "Actif",
      Latitude: 45.51962,
      Longitude: -73.58025,
      Annee_implante: 2013
    },
    {
      ID: 100012218,
      Ancien_ID: 29,
      Nom: "Boyer",
      Statut: "Actif",
      Latitude: 45.53365,
      Longitude: -73.59459,
      Annee_implante: 2013
    },
    {
      ID: 100017441,
      Ancien_ID: 7,
      Nom: "University",
      Statut: "Actif",
      Latitude: 45.506134,
      Longitude: -73.57587,
      Annee_implante: 2013
    },
    {
      ID: 100017523,
      Ancien_ID: 1,
      Nom: "Saint-Urbain",
      Statut: "Actif",
      Latitude: 45.5193951037592,
      Longitude: -73.5886631073951,
      Annee_implante: 2014
    },
    {
      ID: 100025474,
      Ancien_ID: "",
      Nom: "Saint-Laurent/Bellechasse",
      Statut: "Actif",
      Latitude: 45.5278195427535,
      Longitude: -73.6031121673584,
      Annee_implante: 2016
    },
    {
      ID: 100034805,
      Ancien_ID: "",
      Nom: "Gouin / Lajeunesse",
      Statut: "Actif",
      Latitude: 45.557660786928885,
      Longitude: -73.67342519533321,
      Annee_implante: 2017
    },
    {
      ID: 100035408,
      Ancien_ID: "",
      Nom: "Boyer 2",
      Statut: "Actif",
      Latitude: 45.54346079168719,
      Longitude: -73.61668336519156,
      Annee_implante: 2017
    },
    {
      ID: 100035409,
      Ancien_ID: "",
      Nom: "Christophe-Colomb_PisteEnSitePropre",
      Statut: "Actif",
      Latitude: 45.55773,
      Longitude: -73.64662,
      Annee_implante: 2017
    },
    {
      ID: 100041101,
      Ancien_ID: "",
      Nom: "Edmond Valade",
      Statut: "Actif",
      Latitude: 45.54168,
      Longitude: -73.68448,
      Annee_implante: 2017
    },
    {
      ID: 100001753,
      Ancien_ID: 18,
      Nom: "Notre-Dame",
      Statut: "Actif",
      Latitude: 45.530216,
      Longitude: -73.544426,
      Annee_implante: 2013
    },
    {
      ID: 100047030,
      Ancien_ID: 15,
      Nom: "Viger",
      Statut: "Actif",
      Latitude: 45.50600884799096,
      Longitude: -73.55960264511492,
      Annee_implante: 2013
    },
    {
      ID: 100052600,
      Ancien_ID: "",
      Nom: "Rachel 3 (Angus)",
      Statut: "Unidirectionnel",
      Latitude: 45.543276810912914,
      Longitude: -73.56190718304119,
      Annee_implante: 2019
    },
    {
      ID: 100052601,
      Ancien_ID: "",
      Nom: "Pont Ile Bizard",
      Statut: "Actif",
      Latitude: 45.486221523199305,
      Longitude: -73.86606423555334,
      Annee_implante: 2019
    },
    {
      ID: 100052602,
      Ancien_ID: "",
      Nom: "Pont Le Gardeur",
      Statut: "Actif",
      Latitude: 45.70089562398661,
      Longitude: -73.4832523129735,
      Annee_implante: 2019
    },
    {
      ID: 100052603,
      Ancien_ID: "",
      Nom: "Piste Des Carrières",
      Statut: "Actif",
      Latitude: 45.53416012524185,
      Longitude: -73.59146414618658,
      Annee_implante: 2019
    },
    {
      ID: 100052604,
      Ancien_ID: "",
      Nom: "Estacade",
      Statut: "Actif",
      Latitude: 45.466750971228336,
      Longitude: -73.53382546846566,
      Annee_implante: 2019
    },
    {
      ID: 100052605,
      Ancien_ID: "",
      Nom: "Notre Dame 3 (Bellerive)",
      Statut: "Actif",
      Latitude: 45.5919291608105,
      Longitude: -73.51000706512123,
      Annee_implante: 2019
    },
    {
      ID: 100052606,
      Ancien_ID: "",
      Nom: "Bennett",
      Statut: "Actif",
      Latitude: 45.55508439136479,
      Longitude: -73.53881875080648,
      Annee_implante: 2019
    },
    {
      ID: 100053055,
      Ancien_ID: "",
      Nom: "Sainte-Croix",
      Statut: "Actif",
      Latitude: 45.511742476289925,
      Longitude: -73.67253108202766,
      Annee_implante: 2019
    },
    {
      ID: 100053057,
      Ancien_ID: "",
      Nom: "Bord-du-Lac vers est_EnMaintenance",
      Statut: "En maintenance",
      Latitude: 45.44692242889087,
      Longitude: -73.7827912507652,
      Annee_implante: 2019
    },
    {
      ID: 100053058,
      Ancien_ID: "",
      Nom: "Bord-du-Lac vers ouest_EnMaintenance",
      Statut: "En maintenance",
      Latitude: 45.44699362538782,
      Longitude: -73.78264165424379,
      Annee_implante: 2019
    },
    {
      ID: 100053059,
      Ancien_ID: "",
      Nom: "Valois",
      Statut: "Actif",
      Latitude: 45.54684413712084,
      Longitude: -73.54238787658998,
      Annee_implante: 2019
    },
    {
      ID: 100053210,
      Ancien_ID: "",
      Nom: "Souligny",
      Statut: "Actif",
      Latitude: 45.595537645041134,
      Longitude: -73.52043545138532,
      Annee_implante: 2019
    },
    {
      ID: 100054073,
      Ancien_ID: "",
      Nom: "16e Avenue (@Bélanger)",
      Statut: "Actif",
      Latitude: 45.56071317115146,
      Longitude: -73.59063628650485,
      Annee_implante: 2019
    },
    {
      ID: 100055268,
      Ancien_ID: "",
      Nom: "Rachel 4 (@ Pie IX)",
      Statut: "Actif",
      Latitude: 45.553646534540135,
      Longitude: -73.5557600288962,
      Annee_implante: 2020
    },
    {
      ID: 100056188,
      Ancien_ID: "",
      Nom: "Maisonneuve 4 (@Plessis)",
      Statut: "Actif",
      Latitude: 45.52133353005951,
      Longitude: -73.55549917938745,
      Annee_implante: 2019
    },
    {
      ID: 100057050,
      Ancien_ID: "",
      Nom: "Maurice-Duplessis",
      Statut: "Actif",
      Latitude: 45.65913034697104,
      Longitude: -73.54248335311773,
      Annee_implante: 2019
    },
    {
      ID: 100057051,
      Ancien_ID: "",
      Nom: "Querbes / St-Roch",
      Statut: "Actif",
      Latitude: 45.53016420946323,
      Longitude: -73.62942808518474,
      Annee_implante: 2019
    },
    {
      ID: 100057052,
      Ancien_ID: "",
      Nom: "Wellington / Charlevoix",
      Statut: "Actif",
      Latitude: 45.47388790233083,
      Longitude: -73.56183075238538,
      Annee_implante: 2019
    },
    {
      ID: 100057053,
      Ancien_ID: "",
      Nom: "Maisonneuve 5 (@Vendôme)",
      Statut: "Actif",
      Latitude: 45.47370620324923,
      Longitude: -73.60486181895988,
      Annee_implante: 2019
    },
    {
      ID: 100057500,
      Ancien_ID: 4,
      Nom: "Maisonneuve 1 (@Berri)",
      Statut: "Actif",
      Latitude: 45.51492450009753,
      Longitude: -73.5613794582211,
      Annee_implante: 2008
    },
    {
      ID: 38,
      Ancien_ID: 38,
      Nom: "Parc U-Zelt Test",
      Statut: "Inactif",
      Latitude: 45.5137,
      Longitude: -73.58221,
      Annee_implante: 2015
    },
    {
      ID: 39,
      Ancien_ID: 39,
      Nom: "Saint-Laurent U-Zelt Test",
      Statut: "Inactif",
      Latitude: 45.52782,
      Longitude: -73.60311,
      Annee_implante: 2015
    },
    {
      ID: 100053209,
      Ancien_ID: "",
      Nom: "Camillien-Houde 1",
      Statut: "Actif",
      Latitude: 45.50861581661045,
      Longitude: -73.59116351638738,
      Annee_implante: 2019
    },
    {
      ID: 100054241,
      Ancien_ID: "",
      Nom: "McGill / William",
      Statut: "Actif",
      Latitude: 45.49983514414373,
      Longitude: -73.55604979610504,
      Annee_implante: 2020
    },
    {
      ID: 100054585,
      Ancien_ID: "",
      Nom: "Remembrance",
      Statut: "En maintenance",
      Latitude: 45.50160317511961,
      Longitude: -73.59793406758837,
      Annee_implante: 2019
    },
    {
      ID: 300014916,
      Ancien_ID: "",
      Nom: "REV Bellechasse 13ème",
      Statut: "Actif",
      Latitude: 45.55546272716089,
      Longitude: -73.58104526996614,
      Annee_implante: 2021
    },
    {
      ID: 300014994,
      Ancien_ID: "",
      Nom: "REV Berri/Sauvé dir sud",
      Statut: "Actif",
      Latitude: 45.55089408852223,
      Longitude: -73.65644216602959,
      Annee_implante: 2021
    },
    {
      ID: 300014993,
      Ancien_ID: "",
      Nom: "REV Lajeunesse/Sauvé dir nord",
      Statut: "Actif",
      Latitude: 45.551458406258135,
      Longitude: -73.65503430293758,
      Annee_implante: 2020
    },
    {
      ID: 300014986,
      Ancien_ID: "",
      Nom: "REV St-Denis/Carrières dir nord",
      Statut: "Actif",
      Latitude: 45.53052686785812,
      Longitude: -73.59711706638338,
      Annee_implante: 2020
    },
    {
      ID: 300014985,
      Ancien_ID: "",
      Nom: "REV St-Denis/Carrières dir sud",
      Statut: "Actif",
      Latitude: 45.53027132795617,
      Longitude: -73.59696149826051,
      Annee_implante: 2020
    },
    {
      ID: 300014995,
      Ancien_ID: "",
      Nom: "REV St-Denis/Duluth dir nord",
      Statut: "Actif",
      Latitude: 45.52085687975788,
      Longitude: -73.57602953910829,
      Annee_implante: 2020
    },
    {
      ID: 300014996,
      Ancien_ID: "",
      Nom: "REV St-Denis/Rachel dir sud",
      Statut: "Actif",
      Latitude: 45.52162362428968,
      Longitude: -73.57789635658266,
      Annee_implante: 2020
    }
  ])

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
      <div className='ItemMenu'></div>

      <div className='CompteurTable'>

        <div className='d-flex'>
          <h1>Comptages de vélos</h1>
          <SortingBox onSort={handleSort} />
        </div >

        <CompteurTable onSort={handleSort} compteurList={sortedCompteurList} />
      </div >
    </div >
  )
}

export default MainSection
