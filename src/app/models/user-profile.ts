import { Trip } from './trip';
import { Base } from './base';

interface TripsState {
	ids: string[];
  trips: { [id: string]: Trip };
}

export class UserProfile extends Base {
  name: string;
  email: string;
  profilePic: Object;
  coverPhoto: Object;
  tripIds: string[];
  isFollowed: boolean;
  token: string;
}
