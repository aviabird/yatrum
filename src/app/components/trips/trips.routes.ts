import { TripsComponent } from './trips.component';
import { Routes } from '@angular/router';
import { TripDetailComponent } from './trip-detail/trip-detail.component';

export const TripRoutes = [
    { path: '', component: TripsComponent },
    { path: ':id', component: TripDetailComponent }
]