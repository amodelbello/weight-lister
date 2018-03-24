import { Injectable } from '@angular/core';
import { OrderByDirection } from '@firebase/firestore-types';
import { Exercise } from '../../models/Exercise';

@Injectable()
export class PaginationService {

  constructor() { }

  getNumberOfPages(totalNumberOfItems, pageItemLimit): number {
    return Math.ceil((totalNumberOfItems / pageItemLimit));
  }

  getStart(configObject: any): number {
    console.log(configObject);
    return configObject.currentPage === 1 ? 0 : ((configObject.currentPage -1) * configObject.pageItemLimit);
  }

  getEnd(configObject: any): number {
    const start = this.getStart(configObject);
    return start + (configObject.pageItemLimit);
  }

  getPage(configObject: any): Exercise[] {

    const start: number = this.getStart(configObject);
    const end: number   = this.getEnd(configObject);

    let returnItems: Exercise[] = configObject.allItems.slice(start, end);
    return returnItems;
  }

}
