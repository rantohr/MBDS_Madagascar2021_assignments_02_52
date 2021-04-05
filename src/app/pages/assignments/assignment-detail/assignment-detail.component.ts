import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from 'src/app/@core/schema/assignment.model';
import { AssignmentsService } from 'src/app/@core/service/assignments.service';
import { AuthService } from 'src/app/@core/service/auth/auth.service';
@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css'],
})
export class AssignmentDetailComponent implements OnInit {
  // passé sous forme d'attribut HTML
  assignmentTransmis: Assignment

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getAssignmentById()
  }

  getAssignmentById(): void {
    // les params sont des string, on va forcer la conversion
    // en number en mettant un "+" devant
    const id = this.route.snapshot.params.id

    console.log('Dans ngOnInit de details, id = ' + id)
    this.assignmentsService.getAssignment(id)
      // tslint:disable-next-line: deprecation
      .subscribe((assignment) => {
        this.assignmentTransmis = assignment
      });
  }

  onAssignmentRendu(): void {
    this.assignmentTransmis.rendu = true

    this.assignmentsService
      .updateAssignment(this.assignmentTransmis)
      // tslint:disable-next-line: deprecation
      .subscribe((reponse) => {
        console.log(reponse.message)
        // et on navigue vers la page d'accueil qui affiche la liste
        this.router.navigate(['/home'])
      });

    // this.assignmentTransmis = null
  }

  onDelete(): void {
    this.assignmentsService
      .deleteAssignment(this.assignmentTransmis)
      // tslint:disable-next-line: deprecation
      .subscribe((reponse) => {
        console.log(reponse.message)

        // on cache l'affichage du détail
        this.assignmentTransmis = null

        // et on navigue vers la page d'accueil qui affiche la liste
        this.router.navigate(['/home'])
      });
  }

  onClickEdit(): void {
    this.router.navigate(['/assignment', this.assignmentTransmis._id, 'edit'], {
      queryParams: {
        nom: 'Michel Buffa',
        metier: 'Professeur',
        responsable: 'MIAGE'
      },
      fragment: 'edition'
    });
  }
}
