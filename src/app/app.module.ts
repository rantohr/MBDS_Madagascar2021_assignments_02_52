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
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
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
import { TokenInterceptor } from './@core/service/http-interceptors/token-interceptor';
import { NavbarComponent } from './@shared/navbar/navbar.component';
import { NotificationComponent } from './@shared/notification/notification.component';
import { AvatarModule } from 'ngx-avatar';
import { AssignmentCardComponent } from './pages/assignments/assignment-card/assignment-card.component';
import { StepperFormComponent } from './@shared/stepper-form/stepper-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteAssignmentDialogComponent } from './pages/assignments/assignment-detail/delete-assignment-dialog/delete-assignment-dialog.component';
import { InfiniteScrollingComponent } from './pages/assignments/infinite-scrolling/infinite-scrolling.component';
import { DragAndDropComponent } from './pages/assignments/drag-and-drop/drag-and-drop.component';
import { UpdateDialogComponent } from './pages/assignments/drag-and-drop/update-dialog/update-dialog.component';

const routes: Routes = [
  {
    // indique que http://localhost:4200 sans rien ou avec un "/" ?? la fin
    // doit afficher le composant AssignmentsComponent (celui qui affiche la liste)
    path: '',
    component: AssignmentsComponent,
    canActivate: [AuthGuard]
  },
  {
    // idem avec  http://localhost:4200/home
    path: 'home',
    component: AssignmentsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add',
    component: AddAssignmentComponent,
    canActivate: [AuthGuard, RoleGuardService], data: {
      role: ['prof']
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
      role: ['prof']
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
    LoginComponent,
    NavbarComponent,
    NotificationComponent,
    AssignmentCardComponent,
    StepperFormComponent,
    DeleteAssignmentDialogComponent,
    InfiniteScrollingComponent,
    DragAndDropComponent,
    UpdateDialogComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDividerModule, MatDatepickerModule, MatSnackBarModule, MatChipsModule, MatAutocompleteModule,
    MatNativeDateModule, MatListModule, MatCheckboxModule, MatTabsModule, MatStepperModule, DragDropModule,
    MatCardModule, MatIconModule, MatFormFieldModule, MatSelectModule, MatDialogModule,
    MatInputModule, MatSlideToggleModule, MatProgressSpinnerModule, MatGridListModule, MatButtonModule,
    ScrollingModule, MatPaginatorModule, InfiniteScrollModule,
    RouterModule.forRoot(routes), HttpClientModule,
    ReactiveFormsModule,
    AvatarModule
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
  entryComponents: [MatDialogModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
