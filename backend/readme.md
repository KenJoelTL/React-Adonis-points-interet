# Backend project

## Description
Le serveur backend du projet vélo du laboratoire de GTI525. [Adonis.js](https://adonisjs.com/) est le framework utiliser pour gérer les données sur les compteurs, les fontaines ainsi que les autres entité du projet.


## Configurations

### Installation du cadriciel
```sh
# Installation des packages
$ npm install
```

### Configuration de l'environnement
Créer un fichier un .env à la racine en copiant le fichier .env.example
```sh
$ cp .env.example .env
```

Assurer vous qu'il y ai au moins ces variables dans le fichier .env
```js
PORT=3333
HOST=0.0.0.0
NODE_ENV=development
APP_KEY=
DRIVE_DISK=local
```

### Base de données
_À venir..._


## Démarrer le projet

Les front-end devrait rouler en même tant que le back-end, alors il est recommendé de faire l'execution des deux serveurs sur des terminaux différent.


```sh
# 1. Démarrer l'application
$ npm run dev
```

Après avoir lancé l'application, le front-end devrait recevoir les données gérer par le serveur backend.
