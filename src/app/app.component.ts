import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AssignmentsService } from './@core/service/assignments.service'
import { AuthService } from './@core/service/auth/auth.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Application de gestion des assignments'

  constructor(
    private authService: AuthService, private router: Router,
    private assignmentsService: AssignmentsService) { }

  peuplerBD(): void {
    // version naive et simple
    // this.assignmentsService.peuplerBD()

    // meilleure version :
    this.assignmentsService.peuplerBDAvecForkJoin()
      // tslint:disable-next-line: deprecation
      .subscribe(() => {
        console.log('LA BD A ETE PEUPLEE, TOUS LES ASSIGNMENTS AJOUTES, ON RE-AFFICHE LA LISTE')
        this.router.navigate(['/home'], { replaceUrl: true })
      })
  }

  logout(): void {
    this.authService.clearTokens();
    this.router.navigate(['/login']);
  }
}
