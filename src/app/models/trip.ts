import { Base } from './base';
import { City } from './city';

export interface Trip extends Base {
    startDate: string;
    status: string; //TODO: https://www.pivotaltracker.com/story/show/134956979
    endDate:   string;
    description: string;
    cities: City[];
}