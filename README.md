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

