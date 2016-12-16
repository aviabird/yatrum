import { UserRoutes } from './components/user/user.routes';
import { UserComponent } from './components/user/user.component';
import { RouterModule, Routes } from "@angular/router";
import { TripRoutes } from './components/trips/trips.routes';

import { InstagramAuthenticationCallbackComponent } from './components/instagram-authentication-callback/instagram-authentication-callback.component';
import { TravellerProfileComponent } from './components/traveller-profile/traveller-profile.component';
import { TripsComponent } from './components/trips/trips.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [

	{ path: '', redirectTo: 'trips', pathMatch: 'full' },
	{ path: 'trips', component: TripsComponent, children: TripRoutes },
	{ path: 'user', component: UserComponent, children: UserRoutes },
	{ path: 'traveller/:id', component: TravellerProfileComponent},
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'instagram_authentication_callback_url', component: InstagramAuthenticationCallbackComponent }
];