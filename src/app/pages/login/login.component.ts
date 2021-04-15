import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@core/service/auth/auth.service';
import { ErrorMessageHandler } from 'src/app/@core/service/error-message-handler';
import { NotificationComponent } from 'src/app/@shared/notification/notification.component';

enum DisplayMode {
  Login,
  Register
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public errorMessage: string;
  public hide = true;
  public loading: false;
  public mode = DisplayMode.Login;
  public displayMode = DisplayMode;

  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private _errorMessageHandler: ErrorMessageHandler) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    switch (this.mode) {
      case DisplayMode.Register:
        this.form = new FormGroup({
          name: new FormControl('', [Validators.required]),
          email: new FormControl('', [Validators.required]),
          password: new FormControl('', [Validators.required, Validators.min(6)]),
          confirm: new FormControl('', [Validators.required, Validators.min(6)]),
        });
        break;
      default:
        this.form = new FormGroup({
          email: new FormControl('', [Validators.required]),
          password: new FormControl('', [Validators.required, Validators.min(6)]),
        });
        break;
    }
  }

  onSwitch(displayMode): void {
    this.mode = displayMode;
    this.createForm();
  }

  onSubmit(): void {
    this.errorMessage = undefined;
    if (this.form.invalid) {
      return;
    }

    switch (this.mode) {
      case DisplayMode.Register:
        if (this.form.get('password').value !== this.form.get('confirm').value) {
          this._snackBar.openFromComponent(NotificationComponent, {
            duration: 4000,
            data: {
              message: 'Les mot de passes ne correspondent pas!',
              type: 'error'
            },
            panelClass: ['error-snackbar']
          });
        } else {
          this.authService.register(this.form.value)
            .subscribe(
              response => {
                this._snackBar.openFromComponent(NotificationComponent, {
                  duration: 4000,
                  data: {
                    message: response.message,
                    type: 'success'
                  },
                  panelClass: ['success-snackbar']
                });
                this.onSwitch(this.displayMode.Login)
              }, error => {
                this._snackBar.openFromComponent(NotificationComponent, {
                  duration: 4000,
                  data: {
                    message: this._errorMessageHandler.getSingleErrorMessage(error),
                    type: 'error'
                  },
                  panelClass: ['error-snackbar']
                });
              }
            );
        }
        break;
      default:
        this.authService.login(this.form.value)
          .subscribe(
            response => {
              this.authService.clearTokens();
              this.authService.storeTokens(response.accessToken, response.refreshToken);
              this.authService.storeLoggedUserRole(response.body?.role);
              this.router.navigate(['/home'])
            }, error => {
              console.log('error', error)
              this._snackBar.openFromComponent(NotificationComponent, {
                duration: 4000,
                data: {
                  message: this._errorMessageHandler.getSingleErrorMessage(error),
                  type: 'error'
                },
                panelClass: ['error-snackbar']
              });
            }
          );
        break;
    }
  }

}
