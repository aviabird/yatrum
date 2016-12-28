import { UserProfileRoutes } from './user-profile/user-profile.routes';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';

export const UserRoutes = [
	{ path: 'settings', component: UserSettingsComponent },
	{ path: ':id', component: UserProfileComponent, children: UserProfileRoutes }
	// { path: ':id', component: UserProfileComponent }
]

