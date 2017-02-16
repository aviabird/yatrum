/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlaceFormService } from './place-form.service';

describe('PlaceFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlaceFormService]
    });
  });

  it('should ...', inject([PlaceFormService], (service: PlaceFormService) => {
    expect(service).toBeTruthy();
  }));
});
