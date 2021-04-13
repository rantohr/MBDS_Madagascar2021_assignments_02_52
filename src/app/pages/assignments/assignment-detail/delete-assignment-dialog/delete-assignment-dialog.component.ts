import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-assignment-dialog',
  templateUrl: './delete-assignment-dialog.component.html',
  styleUrls: ['./delete-assignment-dialog.component.css']
})
export class DeleteAssignmentDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteAssignmentDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  submit(): void {
    console.log('delete')
    this.dialogRef.close(this.data);
  }

  close(): void {
    console.log('close')
    this.dialogRef.close();
  }

}
