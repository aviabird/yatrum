import { LoginComponent } from './components/auth/login/login.component';
import { RouterModule, Routes } from "@angular/router";

import { TripRoutes } from './components/trips/trips.routes';
import { TripsComponent } from './components/trips/trips.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', redirectTo: 'trip', pathMatch: 'full' },
    { path: 'trip', component: TripsComponent, children: TripRoutes },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'login', component: LoginComponent }
];