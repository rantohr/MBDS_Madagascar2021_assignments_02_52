import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from 'src/app/@core/schema/assignment.model';
import { AssignmentsService } from 'src/app/@core/service/assignments.service';
import { ErrorMessageHandler } from 'src/app/@core/service/error-message-handler';
import { NotificationComponent } from 'src/app/@shared/notification/notification.component';
@Component({
  selector: 'app-edit-assigment',
  templateUrl: './edit-assigment.component.html',
  styleUrls: ['./edit-assigment.component.css']
})
export class EditAssigmentComponent implements OnInit {
  assignment: Assignment;

  constructor(
    private _snackBar: MatSnackBar,
    private _errorMessageHandler: ErrorMessageHandler,
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params) {
        this.assignmentsService.getAssignment(params.id)
          // tslint:disable-next-line: deprecation
          .subscribe((assignment) => {
            if (assignment) this.assignment = assignment
          });
      }
    });
  }

  onSubmit(event): void {
    this.assignmentsService.updateAssignment(event)
      .subscribe(response => {
        this._snackBar.openFromComponent(NotificationComponent, {
          duration: 4000,
          data: {
            message: 'Assignment modifié',
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
