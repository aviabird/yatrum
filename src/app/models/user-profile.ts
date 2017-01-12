import { Trip } from './trip';
import { Base } from './base';

interface TripsState {
	ids: string[];
  trips: { [id: string]: Trip };
}

export interface UserProfile extends Base {
  name: string;
  email: string;
  profilePic: Object;
  coverPhoto: Object;
  trips: { [id: string]: TripsState };
  token: string;
}
