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
        startDate: new Date("12-03-2016").toDateString(),
        endDate: new Date("12-12-2016").toDateString(),
        description: "Las Vegas Trip",
        status: "ongoing", // A validation for inclusion
        cities: [
          { 
            id: "1",
            name: "Pune",
            country: "India",
            places: [
              { 
                name: "Aga Khan palace", // restaurant, tourist attraction, airport, etc
                visitedDate: new Date("12-04-2016"),
                description: "Very nice place",
                review: "Very nice place", 
                media: [
                  {
                    link: "http://lorempixel.com/400/200",
                    description: "Had so much fun here"
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
        cities: [
          { 
            id: "1",
            name: "Pune",
            country: "India",
            places: [
              { 
                name: "Aga Khan Palace", // restaurant, tourist attraction, airport, etc
                visitedDate: new Date("01-27-2016"),
                description: `The Aga Khan Palace was built by Sultan Muhammed Shah Aga Khan III in Pune, India. Built in 1892, 
                              it is one of the biggest landmarks in Indian history. The palace was an act of charity by the Sultan who wanted
                              to help the poor in the neighbouring areas of Pune, who were drastically hit by famine`,
                review: "Very nice palace", 
                media: [
                  {
                    link: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Pune_Palace.jpg/1024px-Pune_Palace.jpg",
                    description: "Outside Aga khan palace"
                  },
                  {
                    link: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Gandhis_ashes.jpg/800px-Gandhis_ashes.jpg",
                    description: "Gandhi's ashes at the palace"
                  }
                ]
               },
              {
                name: "Shaniwar Wada",
                visitedDate: new Date("01-28-2016"),
                description: `Shaniwarwada (Śanivāravāḍā) is an 18th-century fortification in the city of Pune in Maharashtra, India. 
                              Built in 1732,[1] it was the seat of the Peshwa rulers of the Maratha Empire until 1818, when the Peshwas 
                              lost control to the East India Company after the Third Anglo-Maratha War. Following the rise of the Maratha Empire,
                              the palace became the center of Indian politics in the 18th century`,
                review: "Good place",
                media: [
                  {
                    link: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Shaniwarwada_gate.JPG/280px-Shaniwarwada_gate.JPG",
                    description: "Gate of shaniwar wada"
                  },
                  {
                    link: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Shaniwar_Wada_palace_fountain.JPG/220px-Shaniwar_Wada_palace_fountain.JPG",
                    description: "Shaniwar wada palace fountain"
                  }
                ]
              },
              {
                name: "Hyatt Regency",
                visitedDate: new Date("01-29-2016"),
                description: "This upscale hotel is a 4-minute walk from the nearest bus stop, 1.5 km from Aga Khan Palace and 8 km from the fortress of Shaniwar Wada.",
                review: "Nice rooms with nice food",
                media: [
                  {
                    link: "https://dubai.regency.hyatt.com/content/dam/PropertyWebsites/regency/dxbrd/Media/All/Hyatt-Regency-Dubai-P243-King-Room-with-City-and-Ocean-View.masthead-feature-panel-medium.jpg",
                    description: "My room interior"
                  },
                  {
                    link: "https://media-cdn.tripadvisor.com/media/photo-s/06/09/af/79/muslim-family-restaurant.jpg",
                    description: "Having lunch with friends"
                  }
                ]
              },
              {
                name: "Lohagad fort",
                visitedDate: new Date("01-30-2016"),
                description: `Lohagad (Marathi: लोहगड, iron fort) is one of the many hill forts of Maharashtra state in India. Situated close to the hill station Lonavala
                              and 52 km (32 mi) northwest of Pune, Lohagad rises to an elevation of 1,033 m (3,389 ft) above sea level. The fort is connected
                              to the neighboring Visapur fort by a small range. The fort was under the Maratha empire for the majority of time, with a short period of 5 years under the Mughal empire.`,
                review: "nice fort",
                media: [
                  {
                    link: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Ganesh_Darwaja_Lohagad.jpg/800px-Ganesh_Darwaja_Lohagad.jpg",
                    description: "At Lohgad fort main entrance"
                  },
                  {
                    link: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Lohagad_wall.jpg/220px-Lohagad_wall.jpg",
                    description: "Lohgad fort walls"
                  }
                ]
              }
            ]
          },
          { 
            id: "2",
            name: "Dubai",
            country: "UAE",
            places: [
              { 
                name: "Burj Khalifa", // restaurant, tourist attraction, airport, etc
                visitedDate: new Date("01-31-2016"),
                description: `"The Burj Khalifa (Arabic: برج خليفة‎‎, Arabic for "Khalifa Tower"; pronounced English /ˈbɜːrdʒ kəˈliːfə/),
                              known as the Burj Dubai before its inauguration, is a megatall skyscraper in Dubai, United Arab Emirates.
                              It is the tallest structure in the world, standing at 829.8 m "`,
                review: "Nice view from top of the building", 
                media: [
                  {
                    link: "http://4.bp.blogspot.com/-9E_KTNVHeWU/VNGeKvoBZMI/AAAAAAAAMSc/6vjnkEaqxQw/s1600/Burj%2BKhalifa%2BPhoto%2Bat%2BNight%2B%2B03.jpg",
                    description: "Burj Khalifa at night"
                  },
                  {
                    link: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Burj_Khalifa_001.jpg/1024px-Burj_Khalifa_001.jpg",
                    description: "Burj Khalifa NamePlate"
                  }
                ]
               },
              { 
                name: "Palm Islands", // restaurant, tourist attraction, airport, etc
                visitedDate: new Date("02-01-2016"),
                description: `Palm Islands are three artificial islands, Palm Jumeirah, Deira Island and Palm Jebel Ali, on the coast of Dubai,
                              United Arab Emirates. As of November 2014, only Palm Jumeirah has been completed. This island takes the form of a palm tree, 
                              topped by a crescent. After completion, Palm Jebel Ali will take a similar shape; each island will be host to a large number of 
                              residential, leisure and entertainment centers and will add a total of 520 kilometers of non-public beaches to the city of Dubai.`,
                review: "Very nice place to visit", 
                media: [
                  {
                    link: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Palm_Jumeirah_early_evening_March_2015.jpg/1024px-Palm_Jumeirah_early_evening_March_2015.jpg",
                    description: "Early evening view of palm islands"
                   }
                ]
               },
              {
                name: "The Dubai Mall",
                visitedDate: new Date("02-02-2016"),
                description: `The Dubai Mall (Arabic: دبي مول‎‎) is a shopping mall in Dubai and the largest mall in the world by total area.
                              Along with West Edmonton Mall in Canada, it is the nineteenth largest shopping mall in the world by gross leasable area.
                              Located in Dubai, United Arab Emirates, it is part of the 20-billion-dollar Downtown complex, and includes 1,200 shops.
                              In 2011 it was the most visited building on the planet, attracting over 54 million visitors. Access to the mall is provided 
                              via Doha Street, rebuilt as a double-decker road in April 2009`,
                review: "Expensive shopping and leisue complex",
                media: [
                  {
                    link: "https://i.ytimg.com/vi/1XnYjReHyT0/hqdefault.jpg",
                    description: "Inside view of Dubai Mall"
                  },
                  {
                    link: "http://c8.alamy.com/comp/D178H3/united-arab-emirates-uae-uae-middle-east-dubai-downtown-dubai-dubai-D178H3.jpg",
                    description: "too much rush outside KFC"
                  }
                ]
              },
            {
              name: "Ski Dubai",
              visitedDate: new Date("02-03-2016"),
              description: `Ski Dubai is an indoor ski resort with 22,500 square meters of indoor ski area.
                            It is a part of the Mall of the Emirates, one of the largest shopping malls in the world, located in Dubai,
                            United Arab Emirates. It was developed by Majid Al Futtaim Group, which also operates the Mall of the Emirates.`,
              review: "Good Place for Indoor Activites at Dubai",
              media: [
                {
                  link: "http://www.malloftheemirates.com/-/media/malloftheemirates/entertainment/skidubaii.jpg",
                  description: "Skiing with the family and friends"
                },
                {
                  link: "https://booking.skidxb.com/sites/default/files/styles/list-style/public/package_image/ski-school_0.jpg?itok=ZfZL10J5",
                  description: "Having fun with friends"
                }
              ]
            },
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
