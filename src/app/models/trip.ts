import { City } from './city';

export interface Trip {
    id: string;
    startDate: string;
    endDate:   string;
    description: string;
    cities: City[];
}