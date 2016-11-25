import { Media } from './media';

export interface Place {
    name: string; // restaurant, tourist attraction, airport, etc
    description: string;
    review: string; 
    media: Media[];
}