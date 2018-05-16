import { Injectable } from '@angular/core';
import { OrderByDirection } from '@firebase/firestore-types';

@Injectable()
export class PaginationService {

  constructor() { }

  getNumberOfPages(configObject: any): number {

    if (
      configObject === undefined ||
      !configObject.hasOwnProperty('allItems') || 
      configObject.allItems === undefined ||
      !configObject.allItems.hasOwnProperty('length') ||
      configObject.pageItemLimit === undefined || 
      isNaN(configObject.pageItemLimit) ||
      configObject.pageItemLimit === 0
    ) {
      return 0;
    }

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
