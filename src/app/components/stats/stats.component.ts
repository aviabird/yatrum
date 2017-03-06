import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from './../../reducers/index';
import { LoadUserTripsAction } from './../../actions/trips.action';
import { Trip } from './../../models/trip';
import { TripsService } from './../../services/trips.service';

@Component({
  selector: 'tr-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  userTrips$: Observable<Trip[]>;
  userIndex: string;
  data: Object = {};
  
  constructor(
    private store: Store<fromRoot.State>,
    private route: ActivatedRoute,
    private tripService: TripsService
  ) {
    this.userTrips$ = this.store.select(fromRoot.getUserTripsCollection);
    
    // Set Grph Data for First Trip
    this.userTrips$.subscribe(trips => {
      if(trips && trips.length > 0){
        let trip = trips[0];
        this.tripService.get_graph_data_for_trip(trip.id).subscribe(response => {
          this.set_graph_data(trip.name, response.labels, response.series)          
        })
      }
    })
  }

  ngOnInit() {
    this.subscription = this.route.parent.params.subscribe(
      (params) => this.userIndex = params['id']
    )
    this.store.dispatch(new LoadUserTripsAction(this.userIndex));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getGraphDataForTrip(id, name){
    this.tripService.get_graph_data_for_trip(id).subscribe(
    response => {
      this.set_graph_data(name, response.labels, response.series)
    }, 
    err => {
      alert("Something went wrong");
    })
  }


  set_graph_data(label_name, labels, data) {
    this.data = {
      labels: labels, // ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: label_name,
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: data //[65, 59, 80, 81, 56, 55, 40]
        }
      ]
    }
    console.log("Inside Set data and data is", this.data )
  }
}
