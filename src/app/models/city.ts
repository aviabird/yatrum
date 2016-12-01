import { Place } from './place';


export interface City {
    id: string;
    name: string;
    country: String;
    places: Place[];
}