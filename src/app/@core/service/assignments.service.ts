import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { assignmentsGeneres } from 'src/app/@shared/data';
import { environment } from '../../../environments/environment';
import { Assignment } from '../schema/assignment.model';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  assignments: Assignment[]

  constructor(private loggingService: LoggingService, private http: HttpClient) { }

  uri = `${environment.SERVER_URL}/api/assignments`

  getAssignments(queries?: { key: string, value: string }[]): Observable<Assignment[]> {
    let urlQueries = ''
    if (Array.isArray(queries) && queries.length) {
      queries.forEach((e, i) => {
        urlQueries = `${urlQueries}${e.key}=${e.value}${(i !== queries.length - 1) ? '&' : ''}`
      });
    }
    return this.http.get<Assignment[]>(this.uri + `${urlQueries ? '?' + urlQueries : ''}`)
  }

  getAssignmentsPagine(page: number, limit: number): Observable<any> {
    return this.http.get<Assignment[]>(this.uri + '?page=' + page + '&limit=' + limit);
  }

  // Pour votre culture, on peut aussi utiliser httpClient avec une promesse
  // et then, async, await etc. Mais ce n'est pas la norme chez les developpeurs
  // Angular
  getAssignmentsAsPromise(): Promise<Assignment[]> {
    console.log('Dans le service de gestion des assignments...')
    // return of(this.assignments);
    return this.http.get<Assignment[]>(this.uri).toPromise();
  }

  getAssignment(id: number): Observable<Assignment> {
    // let assignementCherche = this.assignments.find(a => a.id === id);

    // return of(assignementCherche);

    return this.http.get<Assignment>(this.uri + '/' + id)
      .pipe(
        catchError(this.handleError<any>('### catchError: getAssignments by id avec id=' + id))
      );
  }

  // tslint:disable-next-line: typedef
  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }

  generateId(): number {
    return Math.round(Math.random() * 100000);
  }

  addAssignment(assignment: Assignment): Observable<any> {
    assignment.id = this.generateId();
    // this.loggingService.log(assignment.nom, " a été ajouté");

    /* this.assignments.push(assignment);
    return of("Service: assignment ajouté !"); */

    return this.http.post(this.uri, assignment);
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    // besoin de ne rien faire puisque l'assignment passé en paramètre
    // est déjà un élément du tableau

    // let index = this.assignments.indexOf(assignment);

    // console.log("updateAssignment l'assignment passé en param est à la position " + index + " du tableau");
    this.loggingService.log(assignment.nom, ' a été modifié');

    return this.http.put(this.uri + '/' + assignment._id, assignment);
  }

  deleteAssignment(id: string): Observable<any> {
    return this.http.delete(this.uri + '/' + id);
  }

  peuplerBD(): void {
    assignmentsGeneres.forEach(a => {
      const nouvelAssignment = new Assignment();
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.id = a.id;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;

      this.addAssignment(nouvelAssignment)
        // tslint:disable-next-line: deprecation
        .subscribe(reponse => {
          console.log(reponse.message);
        })
    })
  }

  // autre version qui permet de récupérer un subscribe une fois que tous les inserts
  // ont été effectués
  peuplerBDAvecForkJoin(): Observable<any> {
    const appelsVersAddAssignment = [];

    assignmentsGeneres.forEach((a) => {
      const nouvelAssignment = new Assignment();

      nouvelAssignment.id = a.id;
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;

      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
    });
    return forkJoin(appelsVersAddAssignment); // renvoie un seul Observable pour dire que c'est fini
  }
}
