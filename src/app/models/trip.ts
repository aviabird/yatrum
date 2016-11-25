import { City } from './city';

export interface Trip {
    id: string;
    startDate: string;
    status: string; //TODO: https://www.pivotaltracker.com/story/show/134956979
    endDate:   string;
    description: string;
    cities: City[];
}