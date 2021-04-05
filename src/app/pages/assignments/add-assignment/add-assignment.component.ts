import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Assignment } from 'src/app/@core/schema/assignment.model';
import { AssignmentsService } from 'src/app/@core/service/assignments.service';
@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  // Pour les champs du formulaire
  nom = ''
  dateDeRendu = null

  constructor(private assignmentsService: AssignmentsService, private router: Router) { }

  ngOnInit(): void { }

  onSubmit(event): void {
    if ((!this.nom) || (!this.dateDeRendu)) return

    const nouvelAssignment = new Assignment()
    nouvelAssignment.nom = this.nom
    nouvelAssignment.dateDeRendu = this.dateDeRendu
    nouvelAssignment.rendu = false

    this.assignmentsService.addAssignment(nouvelAssignment)
      // tslint:disable-next-line: deprecation
      .subscribe(reponse => {
        console.log(reponse.message)

        // et on navigue vers la page d'accueil qui affiche la liste
        this.router.navigate(['/home'])
      });
  }

}
