# Projet Angular / Node MDBS Madagascar 2021

#Développeurs:
	- ANDRIAMANALINA Ranto Herizo N°02
	- RATSIMBAZAFY Andry Patrick N°52

#Données:
	- 550 assignments
	- 5 matières
	- 5 profs et 45 élèves

#Lien Github:
	- Backend: https://github.com/rantohr/MBDS_Madagascar2021_assignments_API_02_52
	- Frontend: https://github.com/rantohr/MBDS_Madagascar2021_assignments_02_52
	
#Lien Heroku:
	- Backend: https://mbds-mada2021-assignment-api.herokuapp.com/
	- Frontend: https://mbds-madagascar2021-assignment.herokuapp.com/

#Fonctionnalités:
	- Gestion de login/password avec JWT (access token & refresh token) et gestion de roles
	- Inscription étudiant
	- Ajout de nouvelles collections et propriétés: 
		=> Collections: Matières, Utilisateurs
		=> Propriétés: Auteur, Matière, image de la matière, photo du prof, note, remarques
	- Assignment sous forme d'une Material Card
	- Liste - pagination - infinite scroll - recherche - detail assignment
	- Formulaire de type Stepper : Ajout - Modification
	- Rendu et Non rendu (Drag and drop)
	- Messages de notification et gestion d'erreur du serveur
	- Collection d'élèves et de profs (utilisateurs)
	- Données générées par le module faker.js (https://www.npmjs.com/package/faker)
	- Hébergement sur Heroku.com

#Utilisation en locale:
	- Backend:
		=> Télécharger le zip du projet git
		=> Extraire le fichier zip dans un dossier
		=> Executer la commande dans le dossier du projet : npm install
		=> Pour lancer, executer la commande : npm run dev
	- Frontend:
		=> Télécharger le zip du projet git
		=> extraire le fichier zip dans un dossier
		=> executer la commande dans le dossier du projet : npm install
		=> pour lancer, executer la commande : ng serve

#Vidéo démo:
	.
		
#Accès:
	- Etudiant:
		=> ex: 
			.Nom: Vickie Cruickshank
			.Email: Hilton.Collins37@hotmail.com
			.Mot de passe: azerty
		=> accès à ses assignments et à les rendre
		
	- Prof:
		=> ex: 
			.Email: admin@admin.com
			.Mot de passe: adminpass
		=> accès à toutes les fonctionnalités

#Collections:
	- Assignments: _id - matiere - nom - auteur - rendu - dateDeRendu - note - remarques
	- Subjects: _id - name - image - teacher
	- Users: _id - name - email - password - image - role(prof / etudiant)

#Architecture:
[API]
	- Technologie: nodeJs Express (typescript)
	
	- Structure des dossiers:
		=> public
		=> src
			.environments
			.middlewares
			.models
			.routes
			.utils
		=> index.ts
		=> server.ts
		
	- Routes disponibles:
		=> GET /api/assignments
		=> POST /api/assignments
		=> PUT /api/assignments/:_id
		=> DELETE /api/assignments/:_id
		=> GET /api/assignments/:_id
		=> GET /api/assignments/student/:_id
		=> POST /api/auth/register
		=> POST /api/auth/login
		=> POST /api/auth/refreshtoken
		=> GET /api/subjects
		=> GET /api/subjects/:_id
		=> GET /api/subjects
		=> GET /api/users
		=> GET /api/users/:_id
		=> GET /api/users/teachers
		=> GET /api/users/students
		=> POST /api/upload
		
[ANGULAR]
	- Technologie: Angular (typescript)
	
	- Structure des dossiers:
		=> src
			.assets
			.environments
			.app
				.@core
					.schema
					.service
				.@shared
				.pages
					.assignments
					.login
		
	- Pages disponibles:
		=> login & register
		=> liste des assignments: rendu - non rendu - infinite scrolling
		=> assignment detail & suppression assignment
		=> ajout assignment
		=> edit assignment
		
#Sources:
	- JWT & http interceptor : 
		=> On a déjà eu affaire a une fonctionnalités identique dans notre travail et on a utilisé les codes ainsi que ces liens de tutos
		=> https://www.toptal.com/angular/angular-6-jwt-authentication
		=> https://www.section.io/engineering-education/getting-started-with-jwt-using-angular8-and-nodejs/
		=> https://dev-academy.com/angular-jwt/
	- Card, pagination, recherche, Stepper, onglet, notification
		=> https://material.angular.io/
	- CRUD:
		=> https://github.com/micbuffa/MBDS_Madagascar2021_frontend
	- Données de test: 
		=> https://www.npmjs.com/package/faker
	- Design et idées css:
		=> https://material.angular.io/
		=> https://getbootstrap.com/
		=> https://codepen.io/JavaScriptJunkie/pen/WgRBxw
		=> https://codepen.io/FrankieDoodie/pen/NOJpVX
		=> https://codepen.io/benknight/pen/zxxeay
		=> https://www.sanwebe.com/2014/08/css-html-forms-designs	
		