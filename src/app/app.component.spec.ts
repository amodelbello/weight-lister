import { APP_BASE_HREF } from '@angular/common';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { FlashMessagesModule } from 'angular2-flash-messages';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExercisesComponent } from './components/exercises/exercises/exercises.component';
import { WorkoutsComponent } from './components/workouts/workouts/workouts.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';

import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth/auth.service';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        DashboardComponent,
        ExercisesComponent,
        WorkoutsComponent,
        NotFoundComponent,
        LoginComponent,
      ],
      imports: [
        AppRoutingModule,
        FormsModule,
        FlashMessagesModule.forRoot(),
      ],
      providers: [
        AuthService,
        { provide: APP_BASE_HREF, useValue : '/' },
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
