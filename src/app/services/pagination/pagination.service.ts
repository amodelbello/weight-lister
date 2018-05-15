import { Injectable } from '@angular/core';
import { OrderByDirection } from '@firebase/firestore-types';

@Injectable()
export class PaginationService {

  constructor() { }

  getNumberOfPages(configObject: any): number {
    return Math.ceil((configObject.allItems.length / configObject.pageItemLimit));
  }

  // TODO: Consider renaming this method to getPageItems?
  getPage(configObject: any): Array<any> {

    const start: number = configObject.currentPage === 1 ? 0 : ((configObject.currentPage -1) * configObject.pageItemLimit);
    const end: number   = start + (configObject.pageItemLimit);

    let returnItems: Array<any> = configObject.allItems.slice(start, end);
    return returnItems;
  }

}
