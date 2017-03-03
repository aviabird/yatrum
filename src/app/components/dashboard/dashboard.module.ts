import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DashboardSearchComponent } from './dashboard-search/dashboard-search.component';
import { FeedTripsComponent } from './feed-trips/feed-trips.component';
import { TrendingTripsComponent } from './trending-trips/trending-trips.component';
import { DashboardRoutes } from './dashboard.routes';
import { SharedModule } from '../../shared/index';

import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: DashboardRoutes },
];

@NgModule({
  declarations: [
    // components
    DashboardComponent,
    DashboardSearchComponent,
    FeedTripsComponent,
    TrendingTripsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    InfiniteScrollModule
  ]
})
export class DashboardModule {}