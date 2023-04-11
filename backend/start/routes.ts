/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import { promises as fs } from 'fs'
import { join } from 'path'
const endpoints = {
  compteurs: {
    'desc': 'Compteurs',
    'endpoints': [
      {
        'operation': 'GET',
        'endpoint': '/gti525/v1/compteurs',
        'param': ['limite'],
        'body': []
      },
      {
        'operation': 'GET',
        'endpoint': '/gti525/v1/compteurs/:id',
        'param': [],
        'body': []
      },
      {
        'operation': 'GET',
        'endpoint': '/gti525/v1/compteurs/:id/passages',
        'param': ['debut', 'fin', 'limite'],
        'body': []
      }
    ]
  },
  pointsdinteret: {
    'desc': 'Points d\'intérêt',
    'endpoints': [
      {
        'operation': 'GET',
        'endpoint': '/gti525/v1/pointsdinteret',
        'param': ['id', 'limite', 'type', 'nom'],
        'body': []
      },
      {
        'operation': 'POST',
        'endpoint': '/gti525/v1/pointsdinteret',
        'param': [],
        'body': [
          'Type',
          'Nom',
          'Adresse',
          'Arrondissement',
          'Type',
          'Année',
          'Remarque',
          'ID',
          'Nom_parc_lieu',
          'Proximité_jeux_repère',
          'Intersection',
          'Etat',
          'Date_installation',
          'Precision_localisation',
          'X',
          'Y',
          'Longitude',
          'Latitude'
        ]
      }
    ]
  },
  fontaines: {
    'desc': 'Fontaines',
    'endpoints': [
      {
        'operation': 'GET',
        'endpoint': '/gti525/v1/fontaines',
        'param': [],
        'body': []
      }
    ]
  },
  // ateliers: {
  //   'desc': 'Ateliers',
  //   'endpoints': [
  //     {
  //       'operation': 'GET',
  //       'endpoint': '/gti525/v1/ateliers',
  //       'param': [],
  //       'body': []
  //     }
  //   ]
  // }
}




Route.get('/gti525/v1/', async () => {
  return endpoints
})

Route.get('/gti525/v1/compteurs', async ({ request }) => {
  const limite = request.input('limite')
  const compteurList = require('../data/compteurs.json')

  // Filtrez la liste des compteurs si le paramètre `limite` est fourni.
  const filteredList = limite ? compteurList.slice(0, limite) : compteurList

  return filteredList
})


Route.get('/gti525/v1/fontaines', async () => {
  const fontaineList = require('../data/fontaines.json')
  return fontaineList
})

Route.get('/gti525/v1/compteurs/:id', async ({ params, response }) => {
  const compteurList = require('../data/compteurs.json')
  const compteurId = params.id
  const compteur = compteurList.find(c => c.ID == compteurId)

  if (!compteur) {
    response.status(404).json({ message: 'Compteur introuvable' })
  } else {
    response.json(compteur)
  }
})

Route.get('/gti525/v1/compteurs/:id/passages', async ({ params, request, response }) => {
  const compteurStatsList = require('../data/counter_stats.json')

  const compteurId = params.id
  let from
  let to

  if (request.input('debut')) {
    from = Date.parse(request.input('debut') + ' 00:00:00 GMT-0500')
  }
  if (request.input('fin')) {
    to = Date.parse(request.input('fin') + ' 23:59:59 GMT-0500')
  }

  const filteredList = compteurStatsList.filter(m => {
    let isAccepted = m.id == compteurId
    let compteurDate = Date.parse(m.date + ' GMT-0500')
    if (isAccepted && from) {
      isAccepted = compteurDate >= from
    }
    if (isAccepted && to) {
      isAccepted = compteurDate <= to
    }


    return isAccepted
  })
  response.json(filteredList)
})

Route.get('/gti525/v1/pointsdinteret', async ({ request, response }) => {
  const fontainesList = require('../data/fontaines.json')
  const ateliersList = require('../data/ateliers.json')
  const type = request.input('type')
  const nom = request.input('nom')
  const limite = request.input('limite')

  let pointsdinteretList;

  if (type === 'fontaine') {
    pointsdinteretList = [...fontainesList]
  } else if (type === 'atelier') {
    pointsdinteretList = [...ateliersList]
  } else {
    pointsdinteretList = [...fontainesList, ...ateliersList]
  }
  
  if (nom) {
    pointsdinteretList = pointsdinteretList.filter(p => {
      const searchString = nom.toLowerCase();
      if ("Nom_parc_lieu" in p) {
        return p.Nom_parc_lieu.toLowerCase().includes(searchString) || p.Remarque.toLowerCase().includes(searchString);
      } else {
        return p.Nom.toLowerCase().includes(searchString) || p.Remarque.toLowerCase().includes(searchString);
      }
    })
  }

  if (limite) {
    pointsdinteretList = pointsdinteretList.slice(0, parseInt(limite))
  }

  response.json(pointsdinteretList)
})


Route.get('/gti525/v1/pointsdinteret/:id', async ({ params, response }) => {
  const fontainesList = require('../data/fontaines.json')
  const ateliersList = require('../data/ateliers.json')
  let pointsdinteretList = [...fontainesList, ...ateliersList]
  const pointId = params.id
  const point = pointsdinteretList.find(p => p.ID == pointId)

  if (!point) {
    response.status(404).json({ message: "Point d'intérêt introuvable" })
  } else {
    response.json(point)
  }
})

Route.post('/gti525/v1/pointsdinteret', async ({ request, response }) => {
  const fontainesList = require('../data/fontaines.json')
  const ateliersList = require('../data/ateliers.json')
  const newPoint = request.body()
  const idlist = [...fontainesList, ...ateliersList]
  const requiredFields = {
    fontaine: ['Arrondissement', 'Nom_parc_lieu', 'Proximité_jeux_repère', 'Intersection', 'Etat', 'Date_installation', 'Remarque', 'Precision_localisation', 'X', 'Y', 'Longitude', 'Latitude', 'Type'],
    atelier: ['Nom', 'Adresse', 'Arrondissement', 'Type', 'Année', 'Remarque']
  };

  if (!newPoint || !newPoint.Type) {
    response.status(400).json({ message: "Informations manquantes pour créer un nouveau point d'intérêt" })
  } else if (newPoint.Type !== 'fontaine' && newPoint.Type !== 'atelier') {
    response.status(400).json({ message: "Type de point d'intérêt invalide" })
  } else {
    const missingFields = requiredFields[newPoint.Type].filter(field => !newPoint.hasOwnProperty(field));

    if (missingFields.length > 0) {
      response.status(400).json({ message: `Champs manquants pour le type ${newPoint.Type}: ${missingFields.join(', ')}` })
    } else {
      let currentList, filePath
      if (newPoint.Type === 'fontaine') {
        currentList = fontainesList
        filePath = join(__dirname, '..', 'data', 'fontaines.json')
      } else {
        currentList = ateliersList
        filePath = join(__dirname, '..', 'data', 'ateliers.json')
      }

      // Générer un nouvel ID pour le nouveau point d'intérêt
      const newId = idlist.reduce((maxId, currentPoint) => {
        return Math.max(maxId, currentPoint.ID);
      }, 0) + 1;
      newPoint.ID = newId

      // Ajouter le nouveau point d'intérêt à la liste
      currentList.push(newPoint)

      // Sauvegarder la liste mise à jour dans le fichier JSON
      await fs.writeFile(filePath, JSON.stringify(currentList, null, 2))

      // Retourner le nouveau point d'intérêt créé
      response.status(201).json(newPoint)
    }
  }
})



