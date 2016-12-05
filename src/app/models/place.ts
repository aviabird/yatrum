import { Base } from './base';
import { Media } from './media';

export interface Place extends Base {
    name: string; // restaurant, tourist attraction, airport, etc
    description: string;
    review: string; 
    media: Media[];
    //TODO: Add expenditure here https://www.pivotaltracker.com/story/show/134957027
}