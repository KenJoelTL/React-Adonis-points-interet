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
Créer un fichier un .env à la racine du dossier backend en copiant le fichier .env.example
```sh
$ cp .env.example .env
```

Assurer vous qu'il y ai au moins ces variables dans le fichier .env
```bash
PORT=3333
HOST=0.0.0.0
NODE_ENV=development
APP_KEY=
DRIVE_DISK=local

# configuration de la base de données
DB_CONNECTION=mysql
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_DB_NAME=gti524_lab_eq01 # la base de données doit être créer avant le démarrage de l'application
API_TOKEN=b69d5935-5e8c-4d41-a72a-0e3201227928

```

### Base de données

**1. Création de la base de données**
```sh
$ node ace migration:run
```
ou

Utiliser les fichiers `.sql` compréssés fournis dans le répertoire [data](./data)

**2. Insertion de données**
Utiliser les fichiers compréssés fournis dans le répertoire [data](./data)


## Démarrer le projet

Les front-end devrait rouler en parallèle le back-end, alors il est recommendé de faire l'execution des deux serveurs sur des terminaux différent.


```sh
# 1. Démarrer l'application
$ npm run dev
```

Après avoir lancé l'application, le front-end devrait recevoir les données gérées par le serveur backend.
