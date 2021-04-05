import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router'
import decode from 'jwt-decode'
import { AuthService } from './auth.service'

@Injectable({ providedIn: 'root' })
export class RoleGuardService implements CanActivate {
    constructor(public auth: AuthService, public router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        // this will be passed from the route config
        // on the data property
        const expectedRole = route.data.role
        const token = localStorage.getItem('access-token')
        // decode the token to get its payload
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
