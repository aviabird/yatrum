import { Observable } from 'rxjs/Observable';
import { Trip } from './../models/trip';
import { Injectable } from '@angular/core';

@Injectable()
export class TripsService {

  trips: Trip[];
  constructor() { 
    this.trips = [
      {
        id: "1",
        created_at: '',
        updated_at: '',
        startDate: new Date("12-03-2016").toDateString(),
        endDate: new Date("12-12-2016").toDateString(),
        description: "Las Vegas Trip",
        status: "ongoing", // A validation for inclusion
        cities: [
          { id: '',
            name: "Pune",
            country: "India",
            created_at: '',
            updated_at: '',
            places: [
              { id: '',
                name: "Aga Khan palace", // restaurant, tourist attraction, airport, etc
                description: "Very nice place",
                review: "Very nice place", 
                created_at: '',
                updated_at: '',
                media: [
                  {
                    id: '',
                    link: "http://lorempixel.com/400/200",
                    description: "Had so much fun here",
                    created_at: '',
                    updated_at: ''
                   }
                ]
               }
            ]
          }
        ]
      },
      {
        id: "2",
        startDate: new Date("01-26-2016").toDateString(),
        endDate: new Date("02-04-2016").toDateString(),
        description: "Dubai Trip",
        status: "completed",
        created_at: '',
        updated_at: '',
        cities: [
          { id: '',
            name: "Pune",
            country: "India",
            created_at: '',
            updated_at: '',
            places: [
              { id: '',
                name: "Koregaon park", // restaurant, tourist attraction, airport, etc
                description: "Very nice place",
                review: "Very nice place",
                created_at: '',
                updated_at: '', 
                media: [
                  { id: '',
                    link: "http://lorempixel.com/400/200",
                    description: "Had so much fun here",
                    created_at: '',
                    updated_at: '',
                   }
                ]
               },
              { id: '',
                name: "Koregaon park", // restaurant, tourist attraction, airport, etc
                description: "Very nice place",
                review: "Very nice place",
                created_at: '',
                updated_at: '', 
                media: [
                  { id: '',
                    link: "http://lorempixel.com/400/200",
                    description: "Had so much fun here",
                    created_at: '',
                    updated_at: '',
                   }
                ]
               },
              { id: '',
                name: "Koregaon park", // restaurant, tourist attraction, airport, etc
                description: "Very nice place",
                review: "Very nice place",
                created_at: '',
                updated_at: '', 
                media: [
                  { id: '',
                    link: "http://lorempixel.com/400/200",
                    description: "Had so much fun here",
                    created_at: '',
                    updated_at: '',
                   }
                ]
               }
            ]
          },
          { id: '',
            name: "Dubai",
            country: "UAE",
            created_at: '',
            updated_at: '',
            places: [
              { id: '',
                name: "Burj Khalifa", // restaurant, tourist attraction, airport, etc
                description: "Very nice place",
                review: "Very nice place",
                created_at: '',
                updated_at: '', 
                media: [
                  { id: '',
                    link: "http://lorempixel.com/400/200",
                    description: "Had so much fun here",
                    created_at: '',
                    updated_at: '',
                   }
                ]
               },
              { id: '',
                name: "Burj Khalifa", // restaurant, tourist attraction, airport, etc
                description: "Very nice place",
                review: "Very nice place",
                created_at: '',
                updated_at: '', 
                media: [
                  { id: '',
                    link: "http://lorempixel.com/400/200",
                    description: "Had so much fun here",
                    created_at: '',
                    updated_at: '',
                   }
                ]
               }
            ]
          }
        ]
      }
    ]
  }

  getTrips(): Observable<Trip[]>{
    return Observable.of(this.trips);
  }

}
