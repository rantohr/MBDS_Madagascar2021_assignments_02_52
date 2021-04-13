import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from 'src/app/@core/schema/assignment.model';
import { AssignmentsService } from 'src/app/@core/service/assignments.service';
import { AuthService } from 'src/app/@core/service/auth/auth.service';
import { environment } from 'src/environments/environment';
import { DeleteAssignmentDialogComponent } from './delete-assignment-dialog/delete-assignment-dialog.component';
@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css'],
})
export class AssignmentDetailComponent implements OnInit {
  // passé sous forme d'attribut HTML
  @Input() assignmentTransmis: any = {};
  serverPublicUrl = `${environment.SERVER_URL}/public/images/`

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog
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
        console.log("assignment", assignment);
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
    const dialogRef = this.dialog.open(DeleteAssignmentDialogComponent, {
      data: {
        animal: 'panda'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    // this.assignmentsService
    //   .deleteAssignment(this.assignmentTransmis)
    //   // tslint:disable-next-line: deprecation
    //   .subscribe((reponse) => {
    //     console.log(reponse.message)

    //     // on cache l'affichage du détail
    //     this.assignmentTransmis = null

    //     // et on navigue vers la page d'accueil qui affiche la liste
    //     this.router.navigate(['/home'])
    //   });
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