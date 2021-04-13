import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../schema/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  uri = `${environment.SERVER_URL}/api/users`

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.uri)
  }

  getTeachers(): Observable<User[]> {
    return this.http.get<User[]>(this.uri + '/teachers')
  }

  getStudents(): Observable<User[]> {
    return this.http.get<User[]>(this.uri + '/students')
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(this.uri + '/' + id) 
  }
}
