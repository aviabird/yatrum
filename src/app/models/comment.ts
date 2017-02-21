import { Base } from './base';
import { UserProfile } from './user-profile';

export class Comment extends Base{
  user_id: string;
  trip_id: string;
  message: string;
  inserted_at: string;
  user: any;
}