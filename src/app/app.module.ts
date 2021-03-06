import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ExercisesComponent } from './components/exercises/exercises/exercises.component';
import { WorkoutsComponent } from './components/workouts/workouts/workouts.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { AppRoutingModule } from './app-routing.module';

import { AuthService } from './services/auth/auth.service';
import { LoginComponent } from './components/login/login.component';
import { ExerciseService } from './services/exercise/exercise.service';
import { WorkoutService } from './services/workout/workout.service';
import { WorkoutExerciseService } from './services/workout-exercise/workout-exercise.service';
import { UserService } from './services/user/user.service';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ExerciseFormComponent } from './components/exercises/exercise-form/exercise-form.component';
import { TitleCasePipe } from './pipes/title-case.pipe';
import { PaginationService } from './services/pagination/pagination.service';
import { NumberToArrayPipe } from './pipes/number-to-array.pipe';
import { AccountComponent } from './components/account/account.component';
import { PaginationControlsComponent } from './components/table/pagination-controls/pagination-controls.component';
import { PageItemLimitComponent } from './components/table/page-item-limit/page-item-limit.component';
import { ColumnHeaderComponent } from './components/table/column-header/column-header.component';
import { SearchFieldComponent } from './components/form/search-field/search-field.component';
import { LoadingDirective } from './directives/loading.directive';
import { FilterFieldComponent } from './components/form/filter-field/filter-field.component';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { SortingService } from './services/sorting/sorting.service';
import { WorkoutComponent } from './components/workouts/workout/workout.component';
import { DatetimePickerComponent } from './components/form/datetime-picker/datetime-picker.component';
import { WorkoutExerciseComponent } from './components/workouts/workout-exercise/workout-exercise.component';
import { ExerciseSetComponent } from './components/workouts/exercise-set/exercise-set.component';
import { FormInteractionService } from './services/interaction/form.service';
import { WorkoutExercisesComponent } from './components/workouts/workout-exercises/workout-exercises.component';

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
    NumberToArrayPipe,
    AccountComponent,
    PaginationControlsComponent,
    PageItemLimitComponent,
    ColumnHeaderComponent,
    SearchFieldComponent,
    LoadingDirective,
    FilterFieldComponent,
    WorkoutComponent,
    DatetimePickerComponent,
    WorkoutExerciseComponent,
    ExerciseSetComponent,
    WorkoutExercisesComponent,
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
    WorkoutService,
    WorkoutExerciseService,
    UserService,
    PaginationService,
    LocalStorageService,
    SortingService,
    FormInteractionService,
  ],
  entryComponents: [
    SpinnerComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
