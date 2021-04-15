import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent implements OnInit {

  note = 0;

  constructor(private dialogRef: MatDialogRef<UpdateDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  submit(): void {
    if (this.note && this.note >= 0 && this.note <= 20) this.dialogRef.close({ ...this.data, rendu: true, note: this.note, dateDeRendu: new Date() });
  }

  close(): void {
    this.dialogRef.close();
  }

}
