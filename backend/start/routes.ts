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

import Route from "@ioc:Adonis/Core/Route";
const endpoints = {
  compteurs: {
    desc: "Compteurs",
    endpoints: [
      {
        operation: "GET",
        endpoint: "/gti525/v1/compteurs",
        param: ["limite", "apiToken"],
        body: [],
      },
      {
        operation: "GET",
        endpoint: "/gti525/v1/compteurs/:id",
        param: ["apiToken"],
        body: [],
      },
      {
        operation: "GET",
        endpoint: "/gti525/v1/compteurs/:id/passages",
        param: ["debut", "fin", "limite", "apiToken"],
        body: [],
      },
    ],
  },
  pointsdinteret: {
    desc: "Points d'intérêt",
    endpoints: [
      {
        operation: "GET",
        endpoint: "/gti525/v1/pointsdinteret",
        param: ["id", "limite", "type", "nom_parc_lieu", "apiToken"],
        body: [],
      },
      {
        operation: "POST",
        endpoint: "/gti525/v1/pointsdinteret",
        param: [],
        body: [
          "apiToken",
          "type",
          "nom_parc_lieu",
          "adresse",
          "arrondissement",
          "type",
          "annee",
          "remarque",
          "id",
          "nom_parc_lieu",
          "proximite_jeux_repere",
          "intersection",
          "etat",
          "date_installation",
          "precision_localisation",
          "x",
          "y",
          "longitude",
          "latitude",
        ],
      },
    ],
  },
};

Route.get("/gti525/v1/", async () => {
  return endpoints;
});

Route.get("/gti525/v1/compteurs", "CompteursController.index");

Route.get("/gti525/v1/compteurs/:id", "CompteursController.show");

Route.get("/gti525/v1/compteurs/:id/passages", "PassagesController.index");

Route.get("/gti525/v1/pointsdinteret", "PointsInteretsController.index");

Route.get("/gti525/v1/pointsdinteret/:id", "PointsInteretsController.show");

Route.post("/gti525/v1/pointsdinteret", "PointsInteretsController.store");
