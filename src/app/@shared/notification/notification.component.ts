import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  snackbarConfig = {
    textColor: 'white',
    icon: '🛈'
  };

  constructor(
    private matSnackBar: MatSnackBar,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) { }

  ngOnInit(): void {
    switch (this.data.type) {
      case 'error':
        this.snackbarConfig = {
          textColor: 'white',
          icon: '🚫'
        }
        break;
      case 'success':
        this.snackbarConfig = {
          textColor: 'white',
          icon: ''
        }
        break;
    }
  }

  onCloseSnackbar() {
    this.matSnackBar.dismiss()
  }
}
