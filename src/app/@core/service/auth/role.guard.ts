import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router'
import decode from 'jwt-decode'
import { AuthService } from './auth.service'

@Injectable({ providedIn: 'root' })
export class RoleGuardService implements CanActivate {
    constructor(public auth: AuthService, public router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const expectedRole = route.data.role
        const token = localStorage.getItem('access-token')
        const tokenPayload: any = decode(token)
        if (
            !this.auth.isAuthenticated() ||
            !expectedRole.includes(tokenPayload.role)
        ) {
            this.router.navigate(['/login'])
            return false
        }
        return true
    }
}
