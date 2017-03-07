import { SharedModule } from './shared/index';
import { AmbassadorComponent } from './components/misc/ambassador/ambassador.component';
import { SignupComponent } from './shared/auth/signup/signup.component';
import { InstagramAuthenticationCallbackComponent } from './shared/instagram-authentication-callback/instagram-authentication-callback.component';
import { RouterModule, Routes } from "@angular/router";

export const routes: Routes = [

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadChildren: './components/dashboard/dashboard.module#DashboardModule' },
  { path: 'auth', loadChildren: './shared/auth/auth.module#AuthModule' },
  { path: 'user', loadChildren: './components/user/user.module#UserModule' },
  { path: 'trips', loadChildren: './components/trips/trips.module#TripsModule' },
  { path: 'stats/:id', loadChildren: './components/stats/stats.module#StatsModule' },
	{ path: 'instagram_authentication_callback_url', component: InstagramAuthenticationCallbackComponent },
  { path: 'ambassadors', component: AmbassadorComponent }
];