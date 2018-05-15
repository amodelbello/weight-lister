import { TestBed, inject } from '@angular/core/testing';

import { PaginationService } from './pagination.service';

describe('PaginationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaginationService]
    });
  });

  it('should be created', inject([PaginationService], (service: PaginationService) => {
    expect(service).toBeTruthy();
  }));

  describe('getNumberOfPages()', () => {
    it('should get the number of pages when given a valid configObject', inject([PaginationService], (service: PaginationService) => {

      const configObject = {
        allItems: Array(19),
        pageItemLimit: 10,
      }

      let result;
      result = service.getNumberOfPages(configObject);
      expect(result).toBe(2);

      configObject.allItems = Array(2);
      result = service.getNumberOfPages(configObject);
      expect(result).toBe(1);

      configObject.allItems = Array(23);
      result = service.getNumberOfPages(configObject);
      expect(result).toBe(3);
    }));
  });

  describe('getPage()', () => {
    it('should the page items of a particular page when given a valid configObject', inject([PaginationService], (service: PaginationService) => {

      const allItems = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

      const configObject = {
        allItems: allItems, // 19 items
        currentPage: 2,
        pageItemLimit: 10,
      }

      let result;
      result = service.getPage(configObject);
      expect(result.length).toBe(9);
      expect(result[0]).toBe('eleven');
      expect(result[result.length - 1]).toBe('nineteen');

    }));
  });
});
