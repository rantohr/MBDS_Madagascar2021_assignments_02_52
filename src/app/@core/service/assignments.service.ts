import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { assignmentsGeneres } from 'src/app/@shared/data';
import { environment } from '../../../environments/environment';
import { Assignment } from '../schema/assignment.model';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  assignments: Assignment[]

  constructor(private loggingService: LoggingService, private http: HttpClient,
    private authService: AuthService) { }

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

  getAssignmentsPagine(page: number, limit: number, search: string, rendu?: boolean): Observable<any> {
    let renduIntValue = undefined
    if (rendu === true) renduIntValue = 1
    if (rendu === false) renduIntValue = 0
    const query = '?page=' + page + '&limit=' + limit + `${search !== undefined ? '&search=' + search : ''}` + `${renduIntValue !== undefined ? '&rendu=' + renduIntValue : ''}`
    let url = (this.authService.getLoggedUserRole() && this.authService.getLoggedUserRole() == 'etudiant') ? this.uri + '/student' + query : this.uri + query
    return this.http.get<Assignment[]>(url);
  }

  getAssignmentsAsPromise(): Promise<Assignment[]> {
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

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(operation + ' a ??chou?? ' + error.message);
      return of(result as T);
    };
  }

  generateId(): number {
    return Math.round(Math.random() * 100000);
  }

  addAssignment(assignment: Assignment): Observable<any> {
    assignment.id = this.generateId();
    return this.http.post(this.uri, assignment);
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    this.loggingService.log(assignment.nom, ' a ??t?? modifi??');
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

  // autre version qui permet de r??cup??rer un subscribe une fois que tous les inserts
  // ont ??t?? effectu??s
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
