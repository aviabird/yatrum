/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TripsService } from './trips.service';

describe('Service: Trips', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TripsService]
    });
  });

  it('should ...', inject([TripsService], (service: TripsService) => {
    expect(service).toBeTruthy();
  }));
});
