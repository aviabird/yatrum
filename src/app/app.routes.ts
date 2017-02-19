import { AmbassadorComponent } from './components/misc/ambassador/ambassador.component';
import { SignupComponent } from './shared/auth/signup/signup.component';
import { LoginComponent } from './shared/auth/login/login.component';
import { InstagramAuthenticationCallbackComponent } from './shared/instagram-authentication-callback/instagram-authentication-callback.component';
import { RouterModule, Routes } from "@angular/router";


export const routes: Routes = [

	{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
	{ path: 'login', component: LoginComponent },
	{ path: 'signup', component: SignupComponent},
	{ path: 'instagram_authentication_callback_url', component: InstagramAuthenticationCallbackComponent },
	{ path: 'ambassadors', component: AmbassadorComponent}
];