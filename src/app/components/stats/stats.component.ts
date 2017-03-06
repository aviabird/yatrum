import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from './../../reducers/index';
import { LoadUserTripsAction } from './../../actions/trips.action';
import { Trip } from './../../models/trip';
import { TripsService } from './../../services/trips.service';
import { UIChart } from "primeng/components/chart/chart";

@Component({
  selector: 'tr-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsComponent implements OnInit, OnDestroy {

  @ViewChild("chart") chart;

  private subscription: Subscription;
  userTrips$: Observable<Trip[]>;
  userIndex: string;
  data: any = {
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
              datasets: [
                {
                  label: "Dummy Data",
                  backgroundColor: '#42A5F5',
                  borderColor: '#1E88E5',
                  data:  [28, 48, 40, 19, 86, 27, 90]
                }
              ]
            }

  constructor(
    private store: Store<fromRoot.State>,
    private route: ActivatedRoute,
    private tripService: TripsService
  ) {
    this.userTrips$ = this.store.select(fromRoot.getUserTripsCollection);

    /**Set Graph Data for First Trip */
    this.userTrips$.subscribe(trips => {
      if (trips && trips.length > 0) {
        let trip = trips[0];
        this.tripService.get_graph_data_for_trip(trip.id).subscribe(response => {
          // this.set_graph_data(trip.name, response.labels, response.series, this.chart)
          if(response) {
            this.data = {
              labels: response.labels,
              datasets: [
                {
                  label: trip.name,
                  backgroundColor: '#42A5F5',
                  borderColor: '#1E88E5',
                  data: response.series
                }
              ]
            }
          }
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

  getGraphDataForTrip(id, name, chart) {
    this.tripService.get_graph_data_for_trip(id).subscribe(
      response => {
        this.set_graph_data(name, response.labels, response.series, chart)
      },
      err => {
        alert("Something went wrong");
      })
  }

  /**Sets Graph Data */
  set_graph_data(label_name, labels, data, chart) {
    this.data.labels = labels;
    this.data.datasets[0].data = data;
    this.data.datasets[0].label = label_name;
    chart.refresh();
  }
}
