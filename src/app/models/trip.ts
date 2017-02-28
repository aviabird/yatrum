import { Place } from './place';
import { Base } from './base';
import { City } from './city';
import { UserProfile } from './user-profile';

export class Trip extends Base {
    user_id: string;
    profile_pic_url: string;
    startDate: string;
    status: string; //TODO: https://www.pivotaltracker.com/story/show/134956979
    endDate:   string;
    description: string;
    name: string;
    places: Place[];
    user: UserProfile;
    is_liked_by_current_user: boolean;
    trip_likes_count: number;
    thumbnail_image_url: string;
    view_count: number;
    tag_list: string[];
}