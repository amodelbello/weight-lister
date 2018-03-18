import { Injectable } from '@angular/core';
import { OrderByDirection } from '@firebase/firestore-types';
import { Exercise } from '../../models/Exercise';

@Injectable()
export class PaginationService {

  constructor() { }

  getNumberOfPages(configObject: any): number {
    return Math.ceil((configObject.allItems.length / configObject.pageItemLimit));
  }

  convertNumberToArray(num: number): Array<number> {
    return Array.from(Array(num),(x,i)=>i + 1)
  }

  getPage(configObject: any): Exercise[] {

    const start: number = configObject.currentPage === 1 ? 0 : ((configObject.currentPage -1) * configObject.pageItemLimit);
    const end: number   = start + (configObject.pageItemLimit);

    let returnItems: Exercise[] = configObject.allItems.slice(start, end);
    return returnItems;
  }

}
