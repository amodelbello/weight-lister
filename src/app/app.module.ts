import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ExercisesComponent } from './exercises/exercises/exercises.component';
import { WorkoutsComponent } from './workouts/workouts/workouts.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AppRoutingModule } from './app-routing.module';

import { AuthService } from './services/auth/auth.service';
import { LoginComponent } from './login/login.component';
import { ExerciseService } from './services/exercise/exercise.service';
import { UserService } from './services/user/user.service';
import { SpinnerComponent } from './spinner/spinner.component';
import { ExerciseFormComponent } from './exercises/exercise-form/exercise-form.component';
import { TitleCasePipe } from './pipes/title-case.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ExercisesComponent,
    WorkoutsComponent,
    NotFoundComponent,
    DashboardComponent,
    LoginComponent,
    SpinnerComponent,
    ExerciseFormComponent,
    TitleCasePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'weightlister'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FlashMessagesModule.forRoot(),
  ],
  providers: [
    AuthService, 
    ExerciseService,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
