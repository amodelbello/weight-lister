import { APP_BASE_HREF } from '@angular/common';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExercisesComponent } from './exercises/exercises/exercises.component';
import { WorkoutsComponent } from './workouts/workouts/workouts.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth.service';
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
      ],
      imports: [
        AppRoutingModule,
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
