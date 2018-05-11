/*
Useful for mimicing for loop functionality in templates when you want 
to loop a given number of times but don't actually have an array to loop over.
e.g.
<li *ngFor="let page of (numberOfPages | numberToArray)" class="page-item">
*/

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToArray'
})
export class NumberToArrayPipe implements PipeTransform {

  transform(value): Array<number> {
    if (isNaN(value) || typeof value === typeof true) {
      return [];
    } else {
      value = Math.abs(value);
      return Array.from(Array(value),(x,i)=>i + 1)
    }
  }

}
