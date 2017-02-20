/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TripFormService } from './trip-form.service';

describe('TripFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TripFormService]
    });
  });

  it('should ...', inject([TripFormService], (service: TripFormService) => {
    expect(service).toBeTruthy();
  }));
});
