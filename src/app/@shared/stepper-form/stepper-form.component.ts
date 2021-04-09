import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      subjectCtrl: ['', Validators.required],
      titleCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      studentCtrl: ['', Validators.required],
      markCtrl: [''],
      noteCtrl: [''],
      dateCtrl: ['', Validators.required]
    });

    this.firstFormErrorMessage = 'Veuillez remplir les informations';
    this.secondFormErrorMessage = 'Veuillez remplir les informations';

    const myControl = this.secondFormGroup.get('studentCtrl');
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
  }
}

