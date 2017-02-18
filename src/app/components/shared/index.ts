import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoaderComponent } from './loader/loader.component';
import { BrowserModule } from '@angular/platform-browser';
import { TripListItemComponent } from './trips/trip-list-item/trip-list-item.component';
import { HumanizePipe } from '../../pipes/humanize';
import { MomentModule } from 'angular2-moment';
import { FeedTripsComponent } from '../dashboard/feed-trips/feed-trips.component';

const routes: Routes = [
];

@NgModule({
  declarations: [
    // components
    LoaderComponent,
    FeedTripsComponent,
    TripListItemComponent,
    HumanizePipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forChild(routes),
    MomentModule,
  ]
})
export class SharedModule {}