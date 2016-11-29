import { RouterModule, Routes } from "@angular/router";

import { TripRoutes } from './components/trips/trips.routes';
import { TripsComponent } from './components/trips/trips.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'trip', component: TripsComponent, children: TripRoutes },
    { path: 'dashboard', component: DashboardComponent }
];