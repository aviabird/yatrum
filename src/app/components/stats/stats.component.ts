import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import * as fromRoot from './../../reducers/index';
import { LoadUserTripsAction } from './../../actions/trips.action';
import { Trip } from './../../models/trip';
import { TripsService } from './../../services/trips.service';
import { UIChart } from 'primeng/components/chart/chart';
import * as moment from 'moment/moment';

@Component({
  selector: 'tr-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsComponent implements OnInit, OnDestroy {

  @ViewChild('chart') chart: UIChart;

  dummyData = {
    labels: ['', '', 'March', '', '', 'June', 'July', '', '', '', 'December'],
    datasets: [
      {
        label: 'Dummy Data',
        backgroundColor: 'rgba(2,184,117,.8)',
        borderColor: '#1E88E5',
        data: [28, 48, 40, 19, 86, 27, 90]
      }
    ]
  };

  private subscription: Subscription;
  userTrips$: Observable<Trip[]>;
  userIndex: string;
  data = new Subject();
  options = {
    title: {
      display: true,
      fontSize: 20,
      fontColor: 'black',
      padding: 15,
      text: 'Trip Stats'
    },

    scales: {
      xAxes: [{
        ticks: {
          autoSkip: false,
          minRotation: 360
        }
      }]
    },
    responsive: false,
    maintainAspectRatio: false,
    // multiTooltipTemplate : "<%%=datasetLabel%> : <%%=value%>"
  };

  dateRange = {
    start_date: moment(new Date).subtract(30, 'days'),
    end_date: moment(new Date)
  };

  constructor(
    private store: Store<fromRoot.State>,
    private route: ActivatedRoute,
    private tripService: TripsService
  ) {

    this.data.subscribe(response => {
      if (this.chart && response) {
        setTimeout(() => this.chart.refresh(), 10);
      }
    });
  }

  ngOnInit() {
    this.subscription = this.route.parent.params.subscribe(
      (params) => this.userIndex = params['id']
    )
    this.store.dispatch(new LoadUserTripsAction(this.userIndex));
    this.setInitialGraphData();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.data.unsubscribe();
  }

  formatLabels(labels: Array<any>) {
    labels = labels.map((label, i) => {
      if (i % 7 === 0) {
        return moment(label).format('MMMM Do');
      } else {
        return '';
      }
    });
    return labels;
  }


  setInitialGraphData() {
    /**Set Graph Data for First Trip */
    this.userTrips$ = this.store.select(fromRoot.getUserTripsCollection).do(trips => {
      if (trips && trips.length > 0) {
        let trip = trips[0];
        this.tripService.get_graph_data_for_trip(trip.id).subscribe(response => {
          let graphData = {
            labels: this.formatLabels(response.labels),
            datasets: [
              {
                label: trip.name,
                backgroundColor: 'rgba(2,184,117,.8)',
                borderColor: '#1E88E5',
                data: response.series
              }
            ]
          };
          // Service call end
          this.data.next(graphData);
        });
      }
    });
  }

  getGraphDataForTrip(id, name) {
    this.tripService.get_graph_data_for_trip(id).subscribe(
      response => {
        let graphData = this.set_graph_data(name, response.labels, response.series);
        this.data.next(graphData);
      },
      err => {
        alert('Something went wrong');
      });
  }

  /**Sets Graph Data */
  set_graph_data(label_name, labels, data) {
    return {
      labels: this.formatLabels(labels),
      datasets: [
        {
          label: label_name,
          backgroundColor: 'rgba(2,184,117,.8)',
          borderColor: '#1E88E5',
          data: data
        }
      ]
    }
  }
}
