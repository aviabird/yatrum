import { Trip } from './trip';

export interface Traveller {
     id: string;   
     trip_ids: string[];
     following_ids: string[];
}