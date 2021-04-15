import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { AssignmentsService } from 'src/app/@core/service/assignments.service';
import { AuthService } from 'src/app/@core/service/auth/auth.service';
import { ErrorMessageHandler } from 'src/app/@core/service/error-message-handler';
import { NotificationComponent } from 'src/app/@shared/notification/notification.component';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css']
})
export class DragAndDropComponent implements OnInit {

  assignments = []

  page = 1
  limit = 15
  @Input() search: string
  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;

  done = [
  ];

  constructor(protected assignmentsService: AssignmentsService,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _errorMessageHandler: ErrorMessageHandler,
    private _authService: AuthService) { }

  ngOnInit(): void {
    this.getAssignments()
  }

  getAssignments(): void {
    this.assignmentsService.getAssignmentsPagine(this.page, this.limit, this.search, false)
      .subscribe(data => {
        this.assignments = [...this.assignments, ...data.docs]
      })

    this.assignmentsService.getAssignmentsPagine(this.page, this.limit, this.search, true)
      .subscribe(data => {
        this.done = [...this.done, ...data.docs]
      })
  }

  searchSublitted(): void {
    this.getAssignments()
  }

  drop(event: CdkDragDrop<string[]>) {

    if (this._authService.getLoggedUserRole() != 'etudiant') {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {

        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);

        const assTransmis: any = event.container.data[event.currentIndex]
        console.log('assTransmis', assTransmis.nom);

        const dialogRef = this.dialog.open(UpdateDialogComponent, {
          data: assTransmis
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            console.log('result', result._id)
            this.assignmentsService.updateAssignment(result)
              .subscribe(response => {
                this._snackBar.openFromComponent(NotificationComponent, {
                  duration: 4000,
                  data: {
                    message: 'Assignment mise à jour',
                    type: 'success'
                  },
                  panelClass: ['success-snackbar']
                });
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
    } else {
      this._snackBar.openFromComponent(NotificationComponent, {
        duration: 4000,
        data: {
          message: 'Vous n\'êtes pas un prof!',
          type: 'error'
        },
        panelClass: ['error-snackbar']
      });
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      this.page = this.page + 1
      this.getAssignments()
    }
  }
}
