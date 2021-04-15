import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { JwtHelperService } from '@auth0/angular-jwt'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { AccountLogin, AccountLogout } from '../../schema/user.model'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  uri = `${environment.SERVER_URL}/api/auth`

  constructor(public jwtHelper: JwtHelperService, private http: HttpClient) {
  }

  login(body: AccountLogin): Observable<any> {
    return this.http.post(`${this.uri}/login`, body)
  }

  register(body: any): Observable<any> {
    return this.http.post(`${this.uri}/register`, body)
  }

  logout(body: AccountLogout): Observable<any> {
    return this.http.post(`${this.uri}/logout`, body)
  }

  refreshToken(): Observable<any> {
    return this.http.post(`${this.uri}/refreshtoken`, {
      refreshToken: this.getRefreshToken()
    }).pipe(
      tap(response => {
        this.storeTokens((response as any).accessToken, (response as any).refreshToken)
      })
    )
  }

  isAuthenticated(): boolean {
    const token = this.getRefreshToken()
    return !this.jwtHelper.isTokenExpired(token)
  }

  getAccessToken(): string {
    return localStorage.getItem('access-token')
  }

  getRefreshToken(): string {
    return localStorage.getItem('refresh-token')
  }

  getLoggedUserRole(): any {
    return localStorage.getItem('user-role')
  }

  storeTokens(access: string, refresh?: string): void {
    localStorage.setItem('access-token', access)
    if (refresh) {
      localStorage.setItem('refresh-token', refresh)
    }
  }

  storeLoggedUserRole(role: string): void {
    localStorage.setItem('user-role', role)
  }

  clearTokens(): void {
    localStorage.removeItem('access-token')
    localStorage.removeItem('refresh-token')
    localStorage.removeItem('user-role')
  }
}
