import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { UserGuard } from './guards/user.guard';

import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExercisesComponent } from './exercises/exercises/exercises.component';
import { WorkoutsComponent } from './workouts/workouts/workouts.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: '', component: DashboardComponent, canActivate: [AuthGuard, UserGuard] },
  { path: 'exercises', component: ExercisesComponent, canActivate: [AuthGuard, UserGuard] },
  { path: 'workouts', component: WorkoutsComponent, canActivate: [AuthGuard, UserGuard] },
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