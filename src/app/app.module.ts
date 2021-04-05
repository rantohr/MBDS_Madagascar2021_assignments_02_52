import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { RenduDirective } from './@shared/rendu.directive';
import { NonRenduDirective } from './@shared/non-rendu.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './@core/service/auth/auth.guard';
import { AddAssignmentComponent } from './pages/assignments/add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from './pages/assignments/assignment-detail/assignment-detail.component';
import { AssignmentsComponent } from './pages/assignments/assignments.component';
import { EditAssigmentComponent } from './pages/assignments/edit-assigment/edit-assigment.component';
import { LoginComponent } from './pages/login/login.component';
import { RoleGuardService } from './@core/service/auth/role.guard';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthService } from './@core/service/auth/auth.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TokenInterceptor } from './@core/service/http-interceptors/token-interceptor';

const routes: Routes = [
  {
    // indique que http://localhost:4200 sans rien ou avec un "/" à la fin
    // doit afficher le composant AssignmentsComponent (celui qui affiche la liste)
    path: '',
    component: AssignmentsComponent
  },
  {
    // idem avec  http://localhost:4200/home
    path: 'home',
    component: AssignmentsComponent
  },
  {
    path: 'add',
    component: AddAssignmentComponent,
    canActivate: [AuthGuard, RoleGuardService], data: {
      role: ['admin']
    }
  },
  {
    path: 'assignment/:id',
    component: AssignmentDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'assignment/:id/edit',
    component: EditAssigmentComponent,
    canActivate: [AuthGuard, RoleGuardService], data: {
      role: ['admin']
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: []
  },
]
@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    NonRenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssigmentComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDividerModule, MatDatepickerModule,
    MatNativeDateModule, MatListModule, MatCheckboxModule,
    MatCardModule, MatIconModule, MatButtonModule, MatFormFieldModule,
    MatInputModule, MatSlideToggleModule, MatProgressSpinnerModule,
    RouterModule.forRoot(routes), HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    JwtHelperService,
    {
      provide: JWT_OPTIONS,
      useValue: JWT_OPTIONS
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
