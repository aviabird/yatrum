import { Base } from './base';

export interface UserProfile extends Base {
  name: string;
  email: string;
  profilePic: Object;
  coverPhoto: Object;
  token: string;
}
