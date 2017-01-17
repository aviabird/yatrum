import { Base } from './base';
import { City } from './city';
import { UserProfile } from './user-profile';

export interface Trip extends Base {
    user_id: string;
    profile_pic_url: string;
    startDate: string;
    status: string; //TODO: https://www.pivotaltracker.com/story/show/134956979
    endDate:   string;
    description: string;
    name: string;
    cities: City[];
    user: UserProfile;
    is_liked_by_current_user: string;
}