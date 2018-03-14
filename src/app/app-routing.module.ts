import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExercisesComponent } from './exercises/exercises/exercises.component';
import { WorkoutsComponent } from './workouts/workouts/workouts.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: DashboardComponent },
  { path: 'exercises', component: ExercisesComponent },
  { path: 'workouts', component: WorkoutsComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: []
})
export class AppRoutingModule { }