import { UserMediaComponent } from './user-media/user-media.component';
import { UserTripsComponent } from './user-trips/user-trips.component';

export const UserProfileRoutes = [
	{ path: '', redirectTo: 'trips', pathMatch: 'full' }, 
	{ path: 'trips', component: UserTripsComponent },
	{ path: 'media', component: UserMediaComponent }
]