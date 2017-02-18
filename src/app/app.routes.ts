import { AmbassadorComponent } from './components/misc/ambassador/ambassador.component';
import { SignupComponent } from './components/shared/auth/signup/signup.component';
import { UserComponent } from './components/user/user.component';
import { UserRoutes } from './components/user/user.routes';
import { TripRoutes } from './components/trips/trips.routes';
import { SearchComponent } from './components/search/search.component';
import { LoginComponent } from './components/shared/auth/login/login.component';
import { InstagramAuthenticationCallbackComponent } from './components/shared/instagram-authentication-callback/instagram-authentication-callback.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TripsComponent } from './components/trips/trips.component';
import { RouterModule, Routes } from "@angular/router";


export const routes: Routes = [

	{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
	{ path: 'trips', component: TripsComponent, children: TripRoutes },
	{ path: 'user', component: UserComponent, children: UserRoutes },
	{ path: 'login', component: LoginComponent },
	{ path: 'signup', component: SignupComponent},
	{ path: 'instagram_authentication_callback_url', component: InstagramAuthenticationCallbackComponent },
	{ path: 'search', component: SearchComponent},
	{ path: 'ambassadors', component: AmbassadorComponent}
];