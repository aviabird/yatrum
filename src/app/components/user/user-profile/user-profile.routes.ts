import { CanActivateViaAuthGuard } from './../../../guards/auth.guard';
import { UserFollowingComponent } from './user-following/user-following.component';
import { UserFollowersComponent } from './user-followers/user-followers.component';
import { UserMediaComponent } from './user-media/user-media.component';
import { UserTripsComponent } from './user-trips/user-trips.component';

export const UserProfileRoutes = [
	{ path: '', redirectTo: 'trips', pathMatch: 'full' }, 
	{ path: 'trips', component: UserTripsComponent },
	{ path: 'media', component: UserMediaComponent },
	{ path: 'followers', component: UserFollowersComponent},
	{ path: 'following', component: UserFollowingComponent }
]