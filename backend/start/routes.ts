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


Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('/gti525/v1/compteurs', async () => {
  const compteurList = require('../data/compteurs.json')
  return compteurList
})

Route.get('/gti525/v1/fontaines', async () => {
  const fontaineList = require('../data/fontaines.json')
  return fontaineList
})

Route.get('/gti525/v1/compteurs/:id', async ({ params, request, response }) => {
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
