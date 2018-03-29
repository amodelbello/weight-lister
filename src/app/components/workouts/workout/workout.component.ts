import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormType } from '../../../models/FormType';
import { Workout, emptyWorkoutObject } from '../../../models/Workout';
import { WorkoutService } from '../../../services/workout/workout.service';

declare var moment: any;

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit {

  dateFormatDisplay = 'dddd, MM/DD/YYYY, h:mm A';
  formType: FormType = null;
  id: string = null;
  workout: Workout = emptyWorkoutObject();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private workoutService: WorkoutService,
  ) { }

  ngOnInit() {
    this.formType = this.getFormType();

    if (this.formType === FormType.edit) {
      this.id = this.getWorkoutIdFromUrl();
      this.workoutService.getWorkout(this.id).subscribe((workout) => {
        this.workout = workout;
        this.workout.date = this.formatDate(this.workout.date);
        console.log(this.workout);
      });
    }
  }

  formatDate(date) {
    return moment(date).format(this.dateFormatDisplay);
  }

  private getFormType(): FormType {
    const url = this.route.snapshot.url;
    if(url[0].path === 'workouts') {

        switch(url[1].path) {

          case 'add':
            return FormType.add;

          case 'edit':
            return FormType.edit;

          default:
            return null;
        }
    } else {
      return null;
    }
  }

  private getWorkoutIdFromUrl(): string {
    return this.route.snapshot.params['id'];
  }
}
