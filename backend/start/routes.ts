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
import Compteur from "App/Models/Compteur";
import PointInteret from "App/Models/PointInteret";
import { promises as fs } from "fs";
import { join } from "path";
const endpoints = {
  compteurs: {
    desc: "Compteurs",
    endpoints: [
      {
        operation: "GET",
        endpoint: "/gti525/v1/compteurs",
        param: ["limite"],
        body: [],
      },
      {
        operation: "GET",
        endpoint: "/gti525/v1/compteurs/:id",
        param: [],
        body: [],
      },
      {
        operation: "GET",
        endpoint: "/gti525/v1/compteurs/:id/passages",
        param: ["debut", "fin", "limite"],
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
        param: ["id", "limite", "type", "nom_parc_lieu"],
        body: [],
      },
      {
        operation: "POST",
        endpoint: "/gti525/v1/pointsdinteret",
        param: [],
        body: [
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
  fontaines: {
    desc: "Fontaines",
    endpoints: [
      {
        operation: "GET",
        endpoint: "/gti525/v1/fontaines",
        param: [],
        body: [],
      },
    ],
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
};

Route.get("/gti525/v1/", async () => {
  return endpoints;
});

Route.get("/gti525/v1/compteurs", "CompteursController.index");

Route.get("/gti525/v1/fontaines", async () => {
  const fontaineList = await PointInteret.query().where(
    "type",
    "Fontaine à boire"
  );
  return fontaineList;
});

Route.get("/gti525/v1/compteurs/:id", "CompteursController.show");

Route.get(
  "/gti525/v1/compteurs/:id/passages",
  async ({ params, request, response }) => {
    const compteurStatsList = require("../data/counter_stats.json");

    const compteurId = params.id;
    let from;
    let to;

    if (request.input("debut")) {
      from = Date.parse(request.input("debut") + " 00:00:00 GMT-0500");
    }
    if (request.input("fin")) {
      to = Date.parse(request.input("fin") + " 23:59:59 GMT-0500");
    }

    const filteredList = compteurStatsList.filter((m) => {
      let isAccepted = m.id == compteurId;
      let compteurDate = Date.parse(m.date + " GMT-0500");
      if (isAccepted && from) {
        isAccepted = compteurDate >= from;
      }
      if (isAccepted && to) {
        isAccepted = compteurDate <= to;
      }

      return isAccepted;
    });
    response.json(filteredList);
  }
);

Route.get("/gti525/v1/pointsdinteret", "PointsInteretsController.index");

Route.get("/gti525/v1/pointsdinteret/:id", "PointsInteretsController.show");

Route.post("/gti525/v1/pointsdinteret", "PointsInteretsController.store");
