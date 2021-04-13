import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Assignment } from 'src/app/@core/schema/assignment.model';
import { AssignmentsService } from 'src/app/@core/service/assignments.service';
import { ErrorMessageHandler } from 'src/app/@core/service/error-message-handler';
import { NotificationComponent } from 'src/app/@shared/notification/notification.component';
@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  // Pour les champs du formulaire
  nom = ''
  dateDeRendu = null

  constructor(
    private assignmentsService: AssignmentsService,
    private _snackBar: MatSnackBar,
    private _errorMessageHandler: ErrorMessageHandler,
    private router: Router
  ) { }

  ngOnInit(): void { }

  onSubmit(event): void {

    this.assignmentsService.addAssignment(event)
      .subscribe(response => {
        this._snackBar.openFromComponent(NotificationComponent, {
          duration: 4000,
          data: {
            message: 'Assignment ajouté',
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

}
