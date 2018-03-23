import { Injectable } from '@angular/core';
import { OrderByDirection } from '@firebase/firestore-types';

@Injectable()
export class SortingService {

  constructor() { }

  sort(collection: any, field: any, direction: OrderByDirection) {

    function compare(a,b) {
      if (a[field] < b[field]) {
        return (direction === 'asc') ? -1 : 1;
      }
      if (a[field] > b[field]) {
        return (direction === 'asc') ? 1 : -1;
      }
      return 0;
    }

    const sortedCollection = collection.sort(compare);

    return sortedCollection;
  }
}
