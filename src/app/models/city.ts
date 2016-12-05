import { Base } from './base';
import { Place } from './place';

export interface City extends Base  {
    name: string;
    country: String;
    places: Place[];
}