import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  secondFormGroup: FormGroup; // examen
  thirdFormGroup: FormGroup; // eleve + note
  subjects = [
    'Base de données', 'Web et Design', 'Algorithme'
  ];

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      subjectCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      titleCtrl: ['', Validators.required],
      dateCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      studentCtrl: ['', Validators.required],
      markCtrl: [''],
      noteCtrl: [''],
    });
  }

}
