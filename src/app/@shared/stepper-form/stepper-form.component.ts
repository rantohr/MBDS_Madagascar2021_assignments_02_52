import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Assignment } from 'src/app/@core/schema/assignment.model';
import { SubjectsService } from 'src/app/@core/service/subjects.service';
import { UsersService } from 'src/app/@core/service/users.service';
import { environment } from 'src/environments/environment';
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

  @Input() assignment: Assignment;
  @Output() submitAssignmentEvent = new EventEmitter<Assignment>();

  firstFormGroup: FormGroup; // matiere
  secondFormGroup: FormGroup; // eleve + note
  subjects = [];
  students = [];
  studentNames = [];
  firstFormErrorMessage: string
  secondFormErrorMessage: string
  filteredOptions: Observable<string[]>
  currentSubject: any
  selectedStudent: any
  errorMessage: string

  constructor(
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private _subjectsService: SubjectsService,
    private _usersService: UsersService
  ) { }

  ngOnInit(): void {
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

    this.firstFormErrorMessage = 'Informations invalides';
    this.secondFormErrorMessage = 'Informations invalides';

    const myControl = this.secondFormGroup.get('auteur');
    this.filteredOptions = myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    this._subjectsService.getSubjects().subscribe(subjects => {
      if (subjects) {
        this.subjects = subjects
        if (this.assignment && this.assignment._id) {
          this.firstFormGroup.get('matiere').setValue((this.assignment.matiere as any)._id)
          this.firstFormGroup.get('nom').setValue(this.assignment.nom)
          this.secondFormGroup.get('note').setValue(this.assignment.note)
          this.secondFormGroup.get('remarques').setValue(this.assignment.remarques)
          this.secondFormGroup.get('dateDeRendu').setValue(formatDate(new Date(this.assignment.dateDeRendu), 'yyyy-MM-dd', 'en'))
          this.secondFormGroup.get('auteur').setValue((this.assignment.auteur as any).name)
          this.selectedStudent = this.assignment.auteur
          this.selectSubject((this.assignment.matiere as any)._id)
        }
      }
    })

    this._usersService.getStudents().subscribe(s => {
      if (s) {
        this.students = s
        console.log('this.students', this.students)
        this.studentNames = this.students.map(e => e.name)
      }
    })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.studentNames.filter(option => option.toLowerCase().includes(filterValue));
  }

  selectSubject(event): void {
    this.currentSubject = this.subjects.find(e => e._id === event)
    this.currentSubject.image = `${environment.SERVER_URL}/public/images/${this.currentSubject.image}`;
    if (this.currentSubject.teacher) this.currentSubject.teacher.image = `${environment.SERVER_URL}/public/images/${this.currentSubject.teacher.image}`;
  }

  selectStudent(value): void {
    this.selectedStudent = undefined
    console.log('value', value)
    this.errorMessage = undefined
    // const auteurName = this.secondFormGroup.get('auteur').value
    const auteurName = value
    const realAuteur = this.students.find(s => s.name === auteurName)
    if (realAuteur) {
      this.selectedStudent = realAuteur
    }
  }

  submit(): void {

    this.errorMessage = undefined
    if (!this.firstFormGroup.valid || !this.secondFormGroup.valid) {
      this._snackBar.openFromComponent(NotificationComponent, {
        duration: 4000,
        data: {
          message: 'Informations invalides!',
          type: 'error'
        },
        panelClass: ['error-snackbar']
      });
    } else if (!this.selectedStudent) {
      this._snackBar.openFromComponent(NotificationComponent, {
        duration: 4000,
        data: {
          message: 'L\'étudiant n\'existe pas',
          type: 'error'
        },
        panelClass: ['error-snackbar']
      });
    } else {
      let validAssigment = {
        ...this.firstFormGroup.value,
        ...this.secondFormGroup.value,
        auteur: this.selectedStudent._id
      }
      if (this.assignment && this.assignment._id) {
        validAssigment = { ...validAssigment, _id: this.assignment._id }
      }
      this.submitAssignmentEvent.emit(validAssigment);
    }
  }
}

