import { CanActivateViaAuthGuard } from './../../guards/auth.guard';
import { TripEditComponent } from './trip-edit/trip-edit.component';
import { TripsResolveGuard } from './../../guards/trips-resolve.guard';
import { TripsComponent } from './trips.component';
import { Routes } from '@angular/router';
import { TripDetailComponent } from './trip-detail/trip-detail.component';

export const TripRoutes = [
  {
    path: 'new',
    component: TripEditComponent,
    canActivate: [ CanActivateViaAuthGuard ]
  },
  { 
    path: ':id',
    component: TripDetailComponent,
    resolve: {
      trip: TripsResolveGuard
    }
  },
  {
    path: ':id/edit',
    component: TripEditComponent,
    resolve: {
      trip: TripsResolveGuard
    },
    canActivate: [ CanActivateViaAuthGuard ]
  }
]
