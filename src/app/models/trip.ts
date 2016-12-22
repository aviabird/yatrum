import { Base } from './base';
import { City } from './city';

export interface Trip extends Base {
    user_id: string;
    traveller_name: string;
    startDate: string;
    status: string; //TODO: https://www.pivotaltracker.com/story/show/134956979
    endDate:   string;
    description: string;
    name: string;
    cities: City[];
}