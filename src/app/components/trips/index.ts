import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/index';
import { TripsComponent } from './trips.component';
import { TripRoutes } from './trips.routes';
import { TripDetailComponent } from './trip-detail/trip-detail.component';
import { TripEditComponent } from './trip-edit/trip-edit.component';
import { NewTripCommentComponent } from './trip-detail/new-trip-comment/new-trip-comment.component';
import { PlaceDetailComponent } from './trip-detail/place-detail/place-detail.component';
import { TripActivityComponent } from './trip-detail/trip-activity/trip-activity.component';
import { TripCommentComponent } from './trip-detail/trip-comment/trip-comment.component';
import { AddPlaceComponent } from './trip-edit/add-place/add-place.component';
import { ImageUploadComponent } from './trip-edit/image-upload/image-upload.component';
import { NewPlaceComponent } from './trip-edit/new-place/new-place.component';
import { UpdatePlaceComponent } from './trip-edit/update-place/update-place.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { CalendarModule } from 'primeng/primeng';
import { TripDetailHeaderComponent } from './trip-detail/trip-detail-header/trip-detail-header.component';

const routes: Routes = [
  { path: 'trips', component: TripsComponent, children: TripRoutes },
];

@NgModule({
  declarations: [
    // components
    TripsComponent,
    TripDetailComponent,
    NewTripCommentComponent,
    PlaceDetailComponent,
    TripActivityComponent,
    TripCommentComponent,
    TripEditComponent,
    AddPlaceComponent,
    ImageUploadComponent,
    NewPlaceComponent,
    UpdatePlaceComponent,
    TripDetailHeaderComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    ReactiveFormsModule,
    CalendarModule
  ]
})
export class TripsModule {}