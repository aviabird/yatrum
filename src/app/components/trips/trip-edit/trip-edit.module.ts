import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { CalendarModule } from 'primeng/primeng';
import { SharedModule } from '../../../shared/index';
import { TagInputModule } from 'ng2-tag-input';

/**Required Components */
import { TripEditComponent } from './../trip-edit/trip-edit.component';
import { AddPlaceComponent } from './../trip-edit/add-place/add-place.component';
import { ImageUploadComponent } from './../trip-edit/image-upload/image-upload.component';
import { NewPlaceComponent } from './../trip-edit/new-place/new-place.component';
import { UpdatePlaceComponent } from './../trip-edit/update-place/update-place.component';

import { TripsResolveGuard } from './../../../guards/trips-resolve.guard';
import { CanActivateViaAuthGuard } from './../../../guards/auth.guard';
const routes: Routes = [
 {
    path: '',
    component: TripEditComponent,
    resolve: {
      trip: TripsResolveGuard
    },
    canActivate: [ CanActivateViaAuthGuard ]
  }
];

@NgModule({
  declarations: [
    // components
    TripEditComponent,
    AddPlaceComponent,
    ImageUploadComponent,
    NewPlaceComponent,
    UpdatePlaceComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    CustomFormsModule,
    ReactiveFormsModule,
    CalendarModule,
    TagInputModule
    ]
})
export class TripEditModule { }