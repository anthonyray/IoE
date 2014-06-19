# Internet of Things Demonstration Platform 
## Documentation de l'application

Bienvenue sur la plateforme de démonstration Internet des Objets. Cette partie de la documentation s'attarde sur l'application à embarquer dans la machine virtuelle d'un routeur équipé de l'architecture IOx.

![alt text](https://raw.githubusercontent.com/anthonyray/IoE/master/documentation/images/cover.jpg "CoverImage")

[![Youtube video](http://img.youtube.com/vi/TSzkk4ilBy8/0.jpg)](https://www.youtube.com/watch?v=TSzkk4ilBy8)


# Description 

Cette application a pour but d'illustrer la pertinence de l'architecture IOx en réponse au paradigme du Fog Computing. Cette application réside dans un routeur d'accès, qui se trouve au plus près des capteurs. Cette application a pour but de recueillir la valeur des capteurs connectés au routeur dans une base de données, contrôler les actionneurs connectés au routeur, et permet de définir des règles sur la valeur des capteurs et de déclencher des actionneurs en cas de dépassement d'une valeur seuil. Pour ce faire, l'application est une API REST, qui reçoit des requêtes HTTP et transforment celles-ci en actions.

Nous avons également inclus une interface graphique construite au-dessus de cette API, mais l'utilisateur est libre de fournir sa propre interface graphique en exploitant les routes définies de l'API (cf documentation API).

# Exigences
Pour faire fonctionner l'application, il est nécessaire d'avoir installé : 
+ `Node.js`
+ `npm` 
+ `VirtualHub` (fourni par Yoctopuce)
+ `sqlite3`
+ (`bower`) (nécessaire pour installer notre interface graphique)

**A partir de maintenant, et pour le reste de la documentation, nous prenons pour hypothèses que votre variable $PATH contient le chemin pour accéder aux applications décrites ci-dessus (node, npm, Virtualhub, sqlite3).**

Si vous souhaitez utiliser l'interface graphique développée, installez également `bower` (`npm install bower -g`).

# Première installation

## Installation des dépendances

Assurez vous d'installer les dernières versions des applications évoquées ci-dessus. Une fois que cela est fait, installer les modules Node.js des tierces-parties, en tapant depuis la racine du projet : 

```` npm install ````

Cette commande s'occupera de parser le contenu du fichier `package.json` qui contient la liste des modules à installer. Vous pouvez regarder le contenu de ce fichier pour voir les noms et versions des modules ainsi que leur dépendance. 

Si vous souhaitez installer l'interface graphique : 
````
cd client
bower install
````
## Configuration des variables de l'application

Remplissez les champs du fichier `conf.js` depuis votre éditeur de texte :
+ le champ `virtualHub.ip` permet de définir l'addresse IP(v4 ou v6) de l'application Virtualhub (localhost si le virtualhub et l'application tournent sur la même machine)
+ le champ `virtualHub.port` permet de définir le port de l'application Virtualhub (4444 par défaut, afin de choisir le port, lancer l'application VirtualHub avec la commande `./VirtualHub -p [numero_de_port]`)
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

### Accéder à l'API
#### Depuis la ligne de commande 
Vous pouvez faire des appels à l'API depuis la ligne de commande avec différents utilitaires. Prenons l'exemple de l'utilitaire CLI le plus répandu : curl. 
Mettons que l'on souhaite récupérer les valeurs dans la base de données d'un capteur d'identifiant METEOMK1-1DB2A.temperature, il suffit d'éxécuter la commande suivante 

````
curl http://localhost:9000/api/db/sensor/METEOMK1-1DB2A.temperature
````

Le résultat obtenu est en le suivant (JSON): 
````
[
	{"thingId":"METEOMK1-1DB2A.temperature","date":1402909192238,"numericValue":25,"textValue":null},
	{"thingId":"METEOMK1-1DB2A.temperature","date":1402909190595,"numericValue":25,"textValue":null},
	{"thingId":"METEOMK1-1DB2A.temperature","date":1402909188961,"numericValue":25,"textValue":null},
	{"thingId":"METEOMK1-1DB2A.temperature","date":1402909187286,"numericValue":25,"textValue":null},
	{"thingId":"METEOMK1-1DB2A.temperature","date":1402909185645,"numericValue":25,"textValue":null},
	{"thingId":"METEOMK1-1DB2A.temperature","date":1402909183990,"numericValue":25,"textValue":null},
	{"thingId":"METEOMK1-1DB2A.temperature","date":1402909182346,"numericValue":25,"textValue":null},
	{"thingId":"METEOMK1-1DB2A.temperature","date":1402909180719,"numericValue":25,"textValue":null},
	{"thingId":"METEOMK1-1DB2A.temperature","date":1402909179070,"numericValue":25,"textValue":null}
]
````

#### Depuis l'interface graphique 

Il est possible de construire sa propre interface graphique et faire son rendu côté client en consommant les données à travers des requêtes ajax à l'API. Il suffit de se référer à la documentation des routes proposées par l'API. 

Par exemple, avec notre interface graphique, nous utilisons le framework Javascript Angular.js. La récupération des données est assurée par un module qui fait des appels à une route particulière de l'API. Par exemple, pour récupérer la liste des capteurs connectés au routeur et leur valeur instantanée : 


````javascript

angular.module('ioEApp').factory('sensorsFactory', function($http) { 
  var factory = {};
            
  factory.getLiveSensors = function() {
    return $http.get('/api/realtime/sensors');
  };
});

````

#### Depuis une autre source 

Il est possible de consommer l'API de n'importe quel moyen. Que ce soit un script BASH, une application mobile native, etc ... Il suffit de se référer à la documentaion des routes de l'API et d'effectuer les requêtes avec les bons arguments. 


## Moteur de règles 

L'application est équipée d'un "moteur de règles" qui permet de vérifier des fronts montants/descendants sur la valeur de capteurs et de déclencher des actions en réponse. Il convient donc de choisir dans un premier temps le déclencheur (appelé trigger) : Ce déclencheur porte sur la valeur d'un capteur. Dans un deuxième temps, il faut choisir l'action : Il s'agit d'une modification de la valeur des capteurs. Ainsi, lorsqu'un capteur subit un front montant ou descendant par rapport à une valeur seuil, l'action est déclenchée : Ceci constitue une règle. 

L'ensemble des règles est vérifié toutes les 1500 ms. 

## Interface graphique. 

Nous rappelons que l'interface graphique est séparée en deux parties : l'une pour l'administration et l'autre qui est un tableau de bord temps réel. 

### Tableau de bord 


![altttext](https://raw.githubusercontent.com/anthonyray/IoE/master/documentation/images/dashboard.jpg "Dashboard interface")


Ce tableau de bord permet de se faire une idée de l'ensemble de la valeur des capteurs connectés au routeur. Il est issu du projet [freeboard.io](https://github.com/Freeboard/freeboard). 
Ce tableau de bord est entièrement modifiable : il utilise un fichier de configuration appelé `dashboard.json` pour sauvegarder l'état de l'interface. Il est possible de régler la fréquence à laquelle sont rafraîchies les valeurs des capteurs dans l'onglet de configuration. Pour une documentation plus détaillée, consultez celle de [freeboard.io](https://github.com/Freeboard/freeboard). 

### Interface d'administration


![alttext](https://raw.githubusercontent.com/anthonyray/IoE/master/documentation/images/administration.tiff "Admin interface")


Nous avons développé une interface d'administration permettant de monitorer la valeur des capteurs, de modifier la valeur des actionneurs en temps réel et de ajouter/retirer à chaud des règles dans le moteur de règles.

Cette application est construite "on top" de notre API, et fait une utilisation quasi-exhaustive des routes définies de l'API. 

Elle est divisée en plusieurs sections :
+ Une section Things : donne une vue générale sur l'ensemble des capteurs et actionneurs connectés, mais aussi un historique des capteurs et de leur valeurs.
+ Une section Rules : permet la consultation, l'ajout et le retrait de règles dynamiques portant sur la valeur des capteurs. 





