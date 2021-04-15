Développeurs:
	.Andriamanalina Ranto Herizo n02
	.Ratsimbazafy Andry Patrick n52

Données:
	.550 assignments
	.5 matières
	.5 profs et 45 élèves

Github:
	.Backend: https://github.com/rantohr/MBDS_Madagascar2021_assignments_API_02_52
	.Frontend: https://github.com/rantohr/MBDS_Madagascar2021_assignments_02_52
	
Heroku:
	.Backend: https://mbds-mada2021-assignment-api.herokuapp.com/
	.Frontend: https://mbds-madagascar2021-assignment.herokuapp.com/

Fonctionnalités:
	.gestion de login/password avec JWT (access token & refresh token) et gestion de roles
	.inscription étudiant
	.ajout de nouvelles collections et propriétés: 
		.collections: Matières, Utilisateurs
		.propriétés: Auteur, Matière, image de la matière, photo du prof, note, Remarques
	.Assignment sous forme d'une Material Card
	.Liste - pagination - infinite scroll - recherche - detail assignment
	.Formulaire de type Stepper : Ajout - Modification
	.Rendu et Non rendu
	.messages de notification et gestion d'erreur du serveur
	.Collection d'élèves et de profs (utilisateurs)
	.Données générées par le module faker.js (https://www.npmjs.com/package/faker)
	.Hébergement sur Heroku.com

Vidéo démo:
	.

Utilisation en locale:
	Backend:
		.Télécharger le zip du projet git
		.extraire le fichier zip dans un dossier
		.executer la commande dans le dossier du projet : npm install
		.pour lancer, executer la commande : npm run dev
	Frontend:
		.Télécharger le zip du projet git
		.extraire le fichier zip dans un dossier
		.executer la commande dans le dossier du projet : npm install
		.pour lancer, executer la commande : ng serve
		
Accès:
	.étudiant:
		=> ex: 
			.email: etu@nice.fr
			.mot de passe: azerty
		.accès à ses assignments et à les rendre
		
	.prof:
		=> ex: 
			.email: admin@admin.com
			.mot de passe: adminpass
		.accès à toutes les fonctionnalités

Collections:
	.Assignments: _id - matiere - nom - auteur - rendu - dateDeRendu - note - remarques
	.Subjects: _id - name - image - teacher
	.Users: _id - name - email - password - image - role(prof / etudiant)

Architecture:
[API]
	.Technologie: nodeJs Express (typescript)
	
	.structure des dossiers:
		.public
		.src
			.environments
			.middlewares
			.models
			.routes
			.utils
		.index.ts
		.server.ts
		
	.routes disponibles:
		.GET /api/assignments
		.POST /api/assignments
		.PUT /api/assignments/:_id
		.DELETE /api/assignments/:_id
		.GET /api/assignments/:_id
		.GET /api/assignments/student/:_id
		.POST /api/auth/register
		.POST /api/auth/login
		.POST /api/auth/refreshtoken
		.GET /api/subjects
		.GET /api/subjects/:_id
		.GET /api/subjects
		.GET /api/users
		.GET /api/users/:_id
		.GET /api/users/teachers
		.GET /api/users/students
		.POST /api/upload
		
[ANGULAR]
	.Technologie: Angular (typescript)
	
	.structure des dossiers:
		.src
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
		
	.pages disponibles:
		.login & register
		.liste des assignments: rendu - non rendu - infinite scrolling
		.assignment detail & suppression assignment
		.ajout assignment
		.edit assignment
		
Sources:
	.jwt & http interceptor : 
		.https://www.toptal.com/angular/angular-6-jwt-authentication
		.https://www.section.io/engineering-education/getting-started-with-jwt-using-angular8-and-nodejs/
		.https://dev-academy.com/angular-jwt/
	.Card, pagination, recherche, Stepper, onglet, notification
		.https://material.angular.io/
	.crud:
		.https://github.com/micbuffa/MBDS_Madagascar2021_frontend
	.données de test: 
		.https://www.npmjs.com/package/faker
	.design et idées css:
		.https://material.angular.io/
		.https://getbootstrap.com/
		.https://codepen.io/JavaScriptJunkie/pen/WgRBxw
		.https://codepen.io/FrankieDoodie/pen/NOJpVX
		.https://codepen.io/benknight/pen/zxxeay
		.https://www.sanwebe.com/2014/08/css-html-forms-designs	
		