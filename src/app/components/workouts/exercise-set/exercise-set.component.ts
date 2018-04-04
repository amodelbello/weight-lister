import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[app-exercise-set]',
  templateUrl: './exercise-set.component.html',
  styleUrls: ['./exercise-set.component.scss']
})
export class ExerciseSetComponent implements OnInit {

  @Input() set: {
    reps: number,
    weight: number;
  };

  @Input() index: number;

  editMode: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  addClick() {
  }

  editClick() {
    this.editMode = true;
  }

  saveClick() {
    this.editMode = false;
  }

  deleteClick() {
  }
}
