import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/@core/service/assignments.service';
import { AuthService } from 'src/app/@core/service/auth/auth.service';
import { ErrorMessageHandler } from 'src/app/@core/service/error-message-handler';
import { NotificationComponent } from 'src/app/@shared/notification/notification.component';
import { environment } from 'src/environments/environment';
import { DeleteAssignmentDialogComponent } from './delete-assignment-dialog/delete-assignment-dialog.component';
@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css'],
})
export class AssignmentDetailComponent implements OnInit {
  @Input() assignmentTransmis: any = {};
  serverPublicUrl = `${environment.SERVER_URL}/public/images/`
  imageProf: string
  imageMatiere: string

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _errorMessageHandler: ErrorMessageHandler,
  ) { }

  ngOnInit(): void {
    this.getAssignmentById()
  }

  getAssignmentById(): void {
    const id = this.route.snapshot.params.id

    this.assignmentsService.getAssignment(id)
      .subscribe((assignment: any) => {
        if (assignment) {
          this.assignmentTransmis = assignment
          if (assignment.matiere) {
            this.imageMatiere = `${this.serverPublicUrl}${assignment.matiere.image}`;
            if (assignment.matiere.teacher) this.imageProf = `${this.serverPublicUrl}${assignment.matiere.teacher.image}`;
          }
        }
      });
  }

  onAssignmentRendu(): void {
    this.assignmentTransmis.rendu = true

    this.assignmentsService
      .updateAssignment(this.assignmentTransmis)
      .subscribe((reponse) => {
        console.log(reponse.message)
        this.router.navigate(['/home'])
      });
  }

  onDelete(): void {
    const dialogRef = this.dialog.open(DeleteAssignmentDialogComponent, {
      data: this.assignmentTransmis
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result`, result);
      if (result) {
        this.assignmentsService.deleteAssignment(result._id)
          .subscribe(response => {
            this._snackBar.openFromComponent(NotificationComponent, {
              duration: 4000,
              data: {
                message: 'Assignment supprimé',
                type: 'success'
              },
              panelClass: ['success-snackbar']
            });
            this.router.navigate(['/']);
          }, error => {
            this._snackBar.openFromComponent(NotificationComponent, {
              duration: 4000,
              data: {
                message: this._errorMessageHandler.getSingleErrorMessage(error),
                type: 'error'
              },
              panelClass: ['error-snackbar']
            });
          });
      }
    });
  }

  onClickEdit(): void {
    this.router.navigate(['/assignment', this.assignmentTransmis._id, 'edit']);
  }
}
