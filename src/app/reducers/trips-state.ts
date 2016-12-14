import { Trip } from './../models/trip';

export interface TripsState {
	ids: string[];
  trips: { [id: string]: Trip };
}