import { TrendingTripsComponent } from './trending-trips/trending-trips.component';
import { FeedTripsComponent } from './feed-trips/feed-trips.component';
export const DashboardRoutes = [
	{ path: '', redirectTo: 'feeds', pathMatch: 'full' }, 
	{ path: 'feeds', component: FeedTripsComponent },
	{ path: 'trending', component: TrendingTripsComponent}
]