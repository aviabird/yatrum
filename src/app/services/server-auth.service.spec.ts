/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ServerAuthService } from './server-auth.service';

describe('Service: ServerAuth', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerAuthService]
    });
  });

  it('should ...', inject([ServerAuthService], (service: ServerAuthService) => {
    expect(service).toBeTruthy();
  }));
});
