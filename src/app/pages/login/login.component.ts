import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@core/service/auth/auth.service';

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

  constructor(private authService: AuthService, private router: Router) { }

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
        this.authService.register(this.form.value)
          // tslint:disable-next-line: deprecation
          .subscribe((response: any) => {
            console.log(response)
            this.router.navigate(['/login'])
          });
        break;
      default:
        this.authService.login(this.form.value)
          // tslint:disable-next-line: deprecation
          .subscribe(response => {
            console.log(response)
            this.authService.storeTokens(response.accessToken, response.refreshToken);
            this.router.navigate(['/home'])
          });
        break;
    }
  }

}
