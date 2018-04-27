import { async, fakeAsync,ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { FormInteractionService } from '../../../services/interaction/form.service'

import { ExerciseSetComponent } from './exercise-set.component';

describe('ExerciseSetComponent', () => {
  let component: ExerciseSetComponent;
  let fixture: ComponentFixture<ExerciseSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ExerciseSetComponent,
      ],
      imports: [
        FormsModule,
      ],
      providers: [
        FormInteractionService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
