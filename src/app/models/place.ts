import { Media } from './media';

export interface Place {
    name: string; // restaurant, tourist attraction, airport, etc
    visitedDate: Date;
    description: string;
    review: string; 
    media: Media[];
    //TODO: Add expenditure here https://www.pivotaltracker.com/story/show/134957027
}