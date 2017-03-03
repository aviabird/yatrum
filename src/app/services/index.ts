import { NgModule } from '@angular/core';
import { PlaceFormService } from './forms/place-form.service';
import { CloudinaryIntegrationService } from './cloudinary-integration.service';
import { ServerAuthService } from './server-auth.service';
import { TripsService } from './trips.service';
import { UserService } from './user.service';
import { TripFormService } from './forms/trip-form.service';
import { InstagramIntegrationService } from './instagram-integration.service';


@NgModule({
  providers: [
    TripFormService,
    PlaceFormService,
    CloudinaryIntegrationService,
    ServerAuthService,
    TripsService,
    UserService,
    InstagramIntegrationService
  ]
})
export class ServiceModule { }