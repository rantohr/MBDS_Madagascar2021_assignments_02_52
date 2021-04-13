import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Assignment } from 'src/app/@core/schema/assignment.model';
import { AssignmentsService } from 'src/app/@core/service/assignments.service';
import { ErrorMessageHandler } from 'src/app/@core/service/error-message-handler';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-stepper-form',
  templateUrl: './stepper-form.component.html',
  styleUrls: ['./stepper-form.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})
export class StepperFormComponent implements OnInit {

  firstFormGroup: FormGroup; // matiere
  secondFormGroup: FormGroup; // eleve + note
  subjects = [
    'Base de données', 'Web et Design', 'Algorithme'
  ];
  students = [
    'Zayn Malik', 'Lelu Ibra', 'Jonas Flex', 'Tom Chung'
  ];
  firstFormErrorMessage: string
  secondFormErrorMessage: string
  filteredOptions: Observable<string[]>;

  constructor(
    private _formBuilder: FormBuilder,
    private assignmentService: AssignmentsService,
    private _snackBar: MatSnackBar, 
    private _errorMessageHandler: ErrorMessageHandler,
    private router: Router) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      matiere: ['', Validators.required],
      nom: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      auteur: ['', Validators.required],
      note: [''],
      remarques: [''],
      dateDeRendu: ['', Validators.required]
    });

    this.firstFormErrorMessage = 'Veuillez remplir les informations';
    this.secondFormErrorMessage = 'Veuillez remplir les informations';

    const myControl = this.secondFormGroup.get('auteur');
    this.filteredOptions = myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.students.filter(option => option.toLowerCase().includes(filterValue));
  }

  submit(): void {
    console.log('values', this.firstFormGroup.value, this.secondFormGroup.value)
    const assignment = new Assignment();
    assignment.nom = this.firstFormGroup.value.nom;
    assignment.dateDeRendu = new Date(this.secondFormGroup.value.dateDeRendu);
    assignment.rendu = false;
    assignment.matiere = "606d4d56d46cb401b45695e7";
    assignment.auteur = "603d28e2dac77e96d16116c9";
    assignment.note = this.secondFormGroup.value.note;
    assignment.remarques = this.secondFormGroup.value.remarques;

    this.assignmentService.addAssignment(assignment)
      .subscribe(response => {
        this._snackBar.openFromComponent(NotificationComponent, {
          duration: 4000,
          data: {
            message: "Assignment ajouté",
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

