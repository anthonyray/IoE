# Cisco Internet of Things Demonstration Platform 
## Documentation de l'application

Bienvenue sur la plateforme de démonstration Internet des Objets. Cette partie de la documentation s'attarde sur l'application à embarquer dans la machine virtuelle d'un routeur équipé de l'architecture IOx.

# Description 

Cette application a pour but d'illustrer la pertinence de l'architecture IOx en réponse au paradigme du Fog Computing. Cette application réside dans un routeur d'accès, qui se trouve au plus près des capteurs. Cette application a pour but de recueillir la valeur des capteurs connectés au routeur dans une base de données, contrôler les actionneurs connectés au routeur, et permet de définir des règles sur la valeur des capteurs et de déclencher des actionneurs en cas de dépassement d'une valeur seuil. Pour ce faire, l'application est une API REST, qui reçoit des requêtes HTTP et transforment celles-ci en actions.

Nous avons également inclus une interface graphique construite au-dessus de cette API, mais l'utilisateur est libre de fournir sa propre interface graphique en exploitant les routes définies de l'API (cf documentation API).

# Exigences
Pour faire fonctionner l'application, il est nécessaire d'avoir installé : 
+ `Node.js`
+ `npm` 
+ `VirtualHub` (fourni par Yoctopuce)
+ `sqlite3`

Si vous souhaitez utiliser l'interface graphique développée, installez également `bower`.

# Première installation

## Installation des dépendances

Assurez vous d'installer les dernières versions des applications évoquées ci-dessus. Une fois que cela est fait, installer les modules Node.js des tierces-parties, en tapant depuis la racine du projet : 

```` npm install ````

Si vous souhaitez installer l'interface graphique : 
````
cd client
bower install
````
## Configuration des variables de l'application

Remplissez les champs du fichier `conf.js` depuis votre éditeur de texte :
+ le champ `virtualHub.ip` permet de définir l'addresse IP(v4 ou v6) de l'application Virtualhub (localhost si le virtualhub et l'application tournent sur la même machine)
+ le champ `virtualHub.port` permet de définir le port de l'application Virtualhub (4444 par défaut)
+ le champ `virtualHub.updateTime` permet de définir la durée de l'intervalle de vérification du branchement/débranchement de périphériques. 
+ le champ `DBPath` permet de définir le chemin vers le fichier de base de données (il est conseillé de le laisser à sa valeur ".");
+ le champ `DBName` permet de nommer le fichier de base de données sqlite3 (par défaut, db.db)

## Initialisation de la base de données

Afin d'initialiser la base de données, éxécutez les commandes suivantes : 
1. `node db_init.js`
2. `node db_populate.js`

Ces commandes initialiseront les tables de la base de données et les rempliront avec des données pour une utilisation immédiate de l'application. 

# Démarrage rapide

Pour démarrer l'application, veuillez suivre les étapes suivantes : 
1. Démarrez l'application `VirtualHub`
2. Dans le répertoire principal, exécutez `node serve.js` . 

A présent, si vous avez installé l'interface graphique, ouvrez un navigateur web récent (et si possible différent d'Internet Explorer), et rendez vous à l'URL : 

+ `localhost:[lenumérodeportquevousavezdéfini]/` pour accéder à l'interface d'administration
+ `localhost:[lenumérodeportquevousavezdéfini]/dashboard` pour accéder au dashboard de l'application

# Documentation détaillée
## Structure générale du code 

L'interface graphique est contenue dans le dossier `client`. Le dossier `data` contient le fichier de la base de données et les modèles des données. Le dossier `routes` contient le détail des routes de l'API.

Le fichier principal est `serve.js` qui s'occupe de faire la glue entre les différents modules. Lors de l'éxecution de ce fichier, la boucle principale est initialisée, les capteurs et actionneurs sont instanciés et l'API est démarrée. 

## Structure détaillée du code 

Détaillons le rôle de chaque module de l'application 
+ `app.js` est responsable de l'API. 
+ `routes/api.js` détaille les routes de l'API
+ `lib/mainloop.js` est le module décrivant la boucle principale. La boucle principale s'éxécute toutes les 1500 ms, et effectue les étapes suivantes : enregistrement des valeurs de tous les capteurs branchés dans la base de données, vérification des règles sur la valeur des capteurs. 
+ `lib/sensorhelper.js` fonctions utilitaires utilisées pour le contrôle des LED RGB. 
+ `lib/virtualhub.js` responsable de l'instanciation des capteurs et actionneurs connectés. Fournit une interface pour accéder à la valeur des capteurs et contrôler les actionneurs. 
+ `data/models/sensorsvalue.js` : représentation des différentes données de l'application. Permet de faire le lien avec la base de données. Représentation des capteurs, actionneurs, déclencheurs, actions et règles. 

## Documentation de l'API 

| VERB | Route | Description | Paramètres |
|:----:|:-----:|:-----------:|:----------:|
| GET  | /api/realtime/sensors | Retourne la liste des capteurs connectés avec leur valeur temps réel ||
| GET  | /api/realtime/sensor/:id | Retourne le capteur avec l'id :id et sa valeur instantanée ||
| GET  | /api/realtime/actuators | Retourne la liste des actionneurs connectés ||
| GET  | /api/realtime/actuator/:id | Retourne le capteur avec l'id :id ||
| POST  | /api/realtime/actuator | Change la valeur de l'actionneur id avec la valeur value | id, value |
| GET  | /api/db/sensors | Retourne l'historique des capteurs avec leur valeur tirés de la base de données ||
| GET  | /api/db/sensor/:id | Retourne le capteur avec l'id :id et ses valeurs enregistrées dans la base de données ||
| GET  | /api/actions | Retourne la liste des actions présentes dans la base de données ||
| GET  | /api/triggers | Retourne la liste des déclencheurs présents dans la base de données ||
| GET  | /api/rules | Retourne la liste des règles présentes dans la base de données ||
| POST  | /api/rules/ | Crée une nouvelle règle à partir de l'identifiant d'un déclencheur et l'identifiant d'une action | triggerId, actionId|
| DELETE | /api/rules/:ruleId | Supprime la règle d'id :ruleId ||

## Moteur de règles 

L'application est équipée d'un "moteur de règles" qui permet de vérifier des fronts montants/descendants sur la valeur de capteurs et de déclencher des actions en réponse. Il convient donc de choisir dans un premier temps le déclencheur (appelé trigger) : Ce déclencheur porte sur la valeur d'un capteur. Dans un deuxième temps, il faut choisir l'action : Il s'agit d'une modification de la valeur des capteurs. Ainsi, lorsqu'un capteur subit un front montant ou descendant par rapport à une valeur seuil, l'action est déclenchée : Ceci constitue une règle. 

L'ensemble des règles est vérifié toutes les 1500 ms. 



