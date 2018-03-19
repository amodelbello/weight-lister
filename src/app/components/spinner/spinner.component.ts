import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
  <hr>
    <div class="container">
      <div class="col-1 mx-auto my-5">
        <i class="fa fa-spinner fa-spin" style="font-size:24px"></i>
      </div>
    </div>
  `
})
export class SpinnerComponent {
  constructor() { }
}
