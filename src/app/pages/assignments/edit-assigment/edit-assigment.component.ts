import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from 'src/app/@core/schema/assignment.model';
import { AssignmentsService } from 'src/app/@core/service/assignments.service';
@Component({
  selector: 'app-edit-assigment',
  templateUrl: './edit-assigment.component.html',
  styleUrls: ['./edit-assigment.component.css']
})
export class EditAssigmentComponent implements OnInit {
  assignment: Assignment;

  // pour le formulaire
  nom = ''
  dateDeRendu = null

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // ici on montre comment on peut récupérer les parametres http
    // par ex de :
    // http://localhost:4200/assignment/1/edit?nom=Michel%20Buffa&metier=Professeur&responsable=MIAGE#edition

    console.log(this.route.snapshot.queryParams)
    console.log(this.route.snapshot.fragment)

    this.getAssignmentById()
  }

  getAssignmentById(): void {
    // les params sont des string, on va forcer la conversion
    // en number en mettant un "+" devant
    const id: number = +this.route.snapshot.params.id
    console.log('Dans ngOnInit de details, id = ' + id)
    this.assignmentsService.getAssignment(id)
    // tslint:disable-next-line: deprecation
    .subscribe((assignment) => {
      this.assignment = assignment

      this.nom = assignment.nom
      this.dateDeRendu = assignment.dateDeRendu
    });
  }


  onSubmit(event): void {
    // on va modifier l'assignment
    if ((!this.nom) || (!this.dateDeRendu)) return

    this.assignment.nom = this.nom
    this.assignment.dateDeRendu = this.dateDeRendu

    this.assignmentsService.updateAssignment(this.assignment)
      // tslint:disable-next-line: deprecation
      .subscribe(message => {
        console.log(message)

        // et on navigue vers la page d'accueil
        this.router.navigate(['/home'])
      })

  }
}
