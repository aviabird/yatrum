import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
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

    @ViewChild("chart") chart: UIChart;

    dummyData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: "Dummy Data",
                backgroundColor: 'rgba(2,184,117,.8)',
                borderColor: '#1E88E5',
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    }
    private subscription: Subscription;
    userTrips$: Observable<Trip[]>;
    userIndex: string;
    data = new Subject();

    constructor(
        private store: Store<fromRoot.State>,
        private route: ActivatedRoute,
        private tripService: TripsService
    ) {

        this.data.subscribe(response => {
            if (this.chart && response) {
                setTimeout(() => this.chart.refresh(), 10);
            }
        })
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


    setInitialGraphData() {
        /**Set Graph Data for First Trip */
        this.userTrips$ = this.store.select(fromRoot.getUserTripsCollection).do(trips => {
            if (trips && trips.length > 0) {
                let trip = trips[0];
                this.tripService.get_graph_data_for_trip(trip.id).subscribe(response => {
                    let temp = {
                        labels: response.labels,
                        datasets: [
                            {
                                label: trip.name,
                                backgroundColor: 'rgba(2,184,117,.8)',
                                borderColor: '#1E88E5',
                                data: response.series
                            }
                        ]
                    }
                    // Service call end
                    this.data.next(temp);
                })
            }
        })
    }

    getGraphDataForTrip(id, name) {
        this.tripService.get_graph_data_for_trip(id).subscribe(
            response => {
                let temp = this.set_graph_data(name, response.labels, response.series);
                this.data.next(temp)
            },
            err => {
                alert("Something went wrong");
            })
    }

    /**Sets Graph Data */
    set_graph_data(label_name, labels, data) {
        return {
            labels: labels,
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
