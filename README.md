<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="">
    <img src="https://raw.githubusercontent.com/othneildrew/Best-README-Template/master/images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Projet Angular / Node MDBS Madagascar 2021</h3>
</p>


<!-- ABOUT THE PROJECT -->
## About The Project

Projet Angular et Node MBDS Madagascar 2021

### Développeurs
	- ANDRIAMANALINA Ranto Herizo N°02
	- RATSIMBAZAFY Andry Patrick N°52

## Lien Github:
1. Backend: [https://github.com/rantohr/MBDS_Madagascar2021_assignments_API_02_52](https://github.com/rantohr/MBDS_Madagascar2021_assignments_API_02_52)
2. Frontend: [https://github.com/rantohr/MBDS_Madagascar2021_assignments_02_52](https://github.com/rantohr/MBDS_Madagascar2021_assignments_02_52)
	
## Lien Heroku:
1. Backend: [https://mbds-mada2021-assignment-api.herokuapp.com/](https://mbds-mada2021-assignment-api.herokuapp.com/)
2. Frontend: [https://mbds-madagascar2021-assignment.herokuapp.com/](https://mbds-madagascar2021-assignment.herokuapp.com/)
	
## Données:
	- 550 assignments
	- 5 matières
	- 5 profs et 45 élèves
	
## Fonctionnalités

1. Gestion de login/password avec JWT (access token & refresh token) et gestion de roles
2. Inscription étudiant
3. Ajout de nouvelles collections et propriétés: 
	* Collections: Matières, Utilisateurs
	* Propriétés: Auteur, Matière, image de la matière, photo du prof, note, remarques
4. Assignment sous forme d'une Material Card
5. Liste - pagination - infinite scroll - recherche - detail assignment
6. Formulaire de type Stepper : Ajout - Modification
7. Rendu et Non rendu
8. Messages de notification et gestion d'erreur du serveur
9. Collection d'élèves et de profs (utilisateurs)
10. Données générées par le module faker.js (https://www.npmjs.com/package/faker)

## Utilisation en locale:

1. Backend:
	* Télécharger le zip du projet git
	* Extraire le fichier zip dans un dossier
	* Executer la commande suivante dans le dossier du projet :
	```sh
	npm install
	```
	* Pour lancer, executer la commande : 
	```sh
	npm run dev
	```
2. Frontend:
	* Télécharger le zip du projet git
	* Extraire le fichier zip dans un dossier
	* Executer la commande suivante dans le dossier du projet :
	```sh
	npm install
	```
	* Pour lancer, executer la commande :
	```sh
	ng serve
	```
## Vidéo démo:
	* https://www.youtube.com/watch?v=YM7MpKXreNg&ab_channel=RantoHr
	
## Accès:

1. Etudiant:
	* Ex: 
		* Nom: Vickie Cruickshank
		* Email: Hilton.Collins37@hotmail.com
		* Mot de passe: azerty
	* Accès à ses assignments et à les rendre
	
2. Prof:
	* Ex: 
		* Email: admin@admin.com
		* Mot de passe: administrator
	* Accès à toutes les fonctionnalités
	
## Collections:

1. Assignments: _id - matiere - nom - auteur - rendu - dateDeRendu - note - remarques
2. Subjects: _id - name - image - teacher
3. Users: _id - name - email - password - image - role(prof / etudiant)

## Architecture:

### API
1. Technologie: nodeJs Express (typescript)

2. Structure des dossiers:
	* public
	* src
		* environments
		* middlewares
		* models
		* routes
		* utils
	* index.ts
	* server.ts
	
3. Routes disponibles:
	* GET /api/assignments
	* POST /api/assignments
	* PUT /api/assignments/:_id
	* DELETE /api/assignments/:_id
	* GET /api/assignments/:_id
	* GET /api/assignments/student/:_id
	* POST /api/auth/register
	* POST /api/auth/login
	* POST /api/auth/refreshtoken
	* GET /api/subjects
	* GET /api/subjects/:_id
	* GET /api/subjects
	* GET /api/users
	* GET /api/users/:_id
	* GET /api/users/teachers
	* GET /api/users/students
	* POST /api/upload
	
### Front End
1. Technologie: Angular (typescript)

2. Structure des dossiers:
	* src
		* assets
		* environments
		* app
			* @core
				* schema
				* service
			* @shared
			* pages
				* assignments
				* login
	
3. Pages disponibles:
	* login & register
	* liste des assignments: rendu - non rendu - infinite scrolling
	* assignment detail & suppression assignment
	* ajout assignment
	* edit assignment
	
## Sources:
1. JWT & http interceptor : 
	* On a déjà eu affaire a une fonctionnalités identique dans notre travail et on a utilisé les codes ainsi que ces liens de tutos
	* [https://www.toptal.com/angular/angular-6-jwt-authentication](https://www.toptal.com/angular/angular-6-jwt-authentication)
	* [https://www.section.io/engineering-education/getting-started-with-jwt-using-angular8-and-nodejs/](https://www.section.io/engineering-education/getting-started-with-jwt-using-angular8-and-nodejs/)
	* [https://dev-academy.com/angular-jwt/](https://dev-academy.com/angular-jwt/)
	
2. Card, pagination, recherche, Stepper, onglet, notification
	* [https://material.angular.io/](https://material.angular.io/)
	
3. CRUD:
	* [https://github.com/micbuffa/MBDS_Madagascar2021_frontend](https://github.com/micbuffa/MBDS_Madagascar2021_frontend)
	
4. Données de test: 
	* [https://www.npmjs.com/package/faker](https://www.npmjs.com/package/faker)
	
5. Design et idées css:
	* [https://material.angular.io/](https://material.angular.io/)
	* [https://getbootstrap.com/](https://getbootstrap.com/)
	* [https://codepen.io/JavaScriptJunkie/pen/WgRBxw](https://codepen.io/JavaScriptJunkie/pen/WgRBxw)
	* [https://codepen.io/FrankieDoodie/pen/NOJpVX](https://codepen.io/FrankieDoodie/pen/NOJpVX) 
	* [https://codepen.io/benknight/pen/zxxeay](https://codepen.io/benknight/pen/zxxeay) 
	* [https://www.sanwebe.com/2014/08/css-html-forms-designs](https://www.sanwebe.com/2014/08/css-html-forms-designs) 	
