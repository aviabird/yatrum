import { Base } from './base';

export class Comment extends Base{
  user_id: string;
  trip_id: string;
  message: string;
  inserted_at: string;
}