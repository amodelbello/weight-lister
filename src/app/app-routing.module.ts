import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { UserGuard } from './guards/user.guard';

import { LoginComponent } from './components/login/login.component';
import { AccountComponent } from './components/account/account.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExercisesComponent } from './components/exercises/exercises/exercises.component';
import { WorkoutsComponent } from './components/workouts/workouts/workouts.component';
import { WorkoutComponent } from './components/workouts/workout/workout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: '', component: DashboardComponent, canActivate: [AuthGuard, UserGuard] },
  { path: 'exercises', component: ExercisesComponent, canActivate: [AuthGuard, UserGuard] },
  { path: 'workouts', component: WorkoutsComponent, canActivate: [AuthGuard, UserGuard] },
  { path: 'workouts/add', component: WorkoutComponent, canActivate: [AuthGuard, UserGuard] },
  { path: 'workouts/edit/:id', component: WorkoutComponent, canActivate: [AuthGuard, UserGuard] },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthGuard,
    UserGuard,
  ]
})
export class AppRoutingModule { }