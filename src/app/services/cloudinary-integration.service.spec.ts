/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CloudinaryIntegrationService } from './cloudinary-integration.service';

describe('Service: CloudinaryIntegration', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CloudinaryIntegrationService]
    });
  });

  it('should ...', inject([CloudinaryIntegrationService], (service: CloudinaryIntegrationService) => {
    expect(service).toBeTruthy();
  }));
});
