import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Assignment } from 'src/app/@core/schema/assignment.model';
import { SubjectsService } from 'src/app/@core/service/subjects.service';
import { UsersService } from 'src/app/@core/service/users.service';
import { environment } from 'src/environments/environment';

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

  constructor(
    private _formBuilder: FormBuilder,
    private _subjectsService: SubjectsService,
    private _usersService: UsersService
  ) { }

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

    this._subjectsService.getSubjects().subscribe(subjects => {
      if (subjects) {
        this.subjects = subjects
      }
    })

    this._usersService.getStudents().subscribe(s => {
      if (s) {
        this.students = s
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
    if(this.currentSubject.teacher) this.currentSubject.teacher.image = `${environment.SERVER_URL}/public/images/${this.currentSubject.teacher.image}`; 
  }

  selectStudent(event): void {
    console.log('event', event)
    // this.subjects = event.teacher
  }

  submit(): void {

    const assignment = new Assignment();
    assignment.nom = this.firstFormGroup.value.nom;
    assignment.dateDeRendu = new Date(this.secondFormGroup.value.dateDeRendu);
    assignment.rendu = false;
    assignment.matiere = "606d4d56d46cb401b45695e7";
    assignment.auteur = "603d28e2dac77e96d16116c9";
    assignment.note = this.secondFormGroup.value.note;
    assignment.remarques = this.secondFormGroup.value.remarques;

    console.log('assignment', assignment)

    this.submitAssignmentEvent.emit(assignment);

  }
}

