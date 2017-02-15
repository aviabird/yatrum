import { Picture } from './picture';
import { Base } from './base';
import { Media } from './media';

export interface Place extends Base {
    name: string; // restaurant, tourist attraction, airport, etc
    visited_date: Date;
    description: string;
    review: string; 
    pictures: Picture[];
    //TODO: Add expenditure here https://www.pivotaltracker.com/story/show/134957027
}