import { TestBed, inject } from '@angular/core/testing';

import { FormInteractionService } from './form.service';

describe('FormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormInteractionService]
    });
  });

  it('should be created', inject([FormInteractionService], (service: FormInteractionService) => {
    expect(service).toBeTruthy();
  }));
});
