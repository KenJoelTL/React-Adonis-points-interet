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
        param: ["id", "limite", "type", "nom"],
        body: [],
      },
      {
        operation: "POST",
        endpoint: "/gti525/v1/pointsdinteret",
        param: [],
        body: [
          "type",
          "nom",
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

Route.post("/gti525/v1/pointsdinteret", async ({ request, response }) => {
  const fontainesList = require("../data/fontaines.json");
  const ateliersList = require("../data/ateliers.json");
  const newPoint = request.body();
  const idlist = [...fontainesList, ...ateliersList];
  const requiredFields = {
    fontaine: [
      "arrondissement",
      "nom_parc_lieu",
      "date_installation",
      "remarque",
      "longitude",
      "latitude",
      "type",
    ],
    atelier: ["nom", "adresse", "arrondissement", "type", "annee", "remarque"],
  };

  if (!newPoint || !newPoint.type) {
    response.status(400).json({
      message: "Informations manquantes pour créer un nouveau point d'intérêt",
    });
  } else if (newPoint.type !== "fontaine" && newPoint.type !== "atelier") {
    response.status(400).json({ message: "type de point d'intérêt invalide" });
  } else {
    const missingFields = requiredFields[newPoint.type].filter(
      (field) => !newPoint.hasOwnProperty(field)
    );

    if (missingFields.length > 0) {
      response.status(400).json({
        message: `Champs manquants pour le type ${
          newPoint.type
        }: ${missingFields.join(", ")}`,
      });
    } else {
      let currentList, filePath;
      if (newPoint.type === "fontaine") {
        currentList = fontainesList;
        filePath = join(__dirname, "..", "data", "fontaines.json");
      } else {
        currentList = ateliersList;
        filePath = join(__dirname, "..", "data", "ateliers.json");
      }

      // Générer un nouvel id pour le nouveau point d'intérêt
      const newId =
        idlist.reduce((maxId, currentPoint) => {
          return Math.max(maxId, currentPoint.id);
        }, 0) + 1;
      newPoint.id = newId;

      // Ajouter le nouveau point d'intérêt à la liste
      currentList.push(newPoint);

      // Sauvegarder la liste mise à jour dans le fichier JSON
      await fs.writeFile(filePath, JSON.stringify(currentList, null, 2));

      // Retourner le nouveau point d'intérêt créé
      response.status(201).json(newPoint);
    }
  }
});
