import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Subject } from '../schema/subject.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  constructor(private http: HttpClient) { }

  uri = `${environment.SERVER_URL}/api/subjects`

  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.uri)
  }

  getSubject(id: string): Observable<Subject> {
    return this.http.get<Subject>(this.uri + '/' + id) 
  }
}
