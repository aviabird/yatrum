import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './header/header.component';
import { SearchFilterComponent } from './search/search-filter/search-filter.component';
import { TripsSearchFilterComponent } from './search/trips-search-filter/trips-search-filter.component';
import { passwordValidator } from './validators/password.validator';
import { DashboardSearchFilterComponent } from './search/dashboard-search-filter/dashboard-search-filter.component';
import { CustomFormsModule } from 'ng2-validation';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { LoaderComponent } from './loader/loader.component';
import { TripListItemComponent } from './trips/trip-list-item/trip-list-item.component';
import { MomentModule } from 'angular2-moment';
import { ToastyModule } from 'ng2-toasty';
import { CalendarModule } from 'primeng/primeng';
import { HumanizePipe } from '../pipes/humanize';
import { ThumbnailPipe } from '../pipes/thumbnail';

const routes: Routes = [
];

@NgModule({
  declarations: [
    // components
    LoaderComponent,
    TripListItemComponent,
    HeaderComponent,
    SearchFilterComponent,
    TripsSearchFilterComponent,
    DashboardSearchFilterComponent,
    HumanizePipe,
    ThumbnailPipe
  ],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CustomFormsModule,
    ReactiveFormsModule,
    SlimLoadingBarModule.forRoot(),
    CommonModule,
    MomentModule,
    SlimLoadingBarModule.forRoot(),
    ToastyModule.forRoot(),
    CalendarModule
  ],
  exports: [
    // components
    LoaderComponent,
    TripListItemComponent,
    HeaderComponent,
    SearchFilterComponent,
    TripsSearchFilterComponent,
    DashboardSearchFilterComponent,
    
    // Pipes
    HumanizePipe,
    ThumbnailPipe,
    
    // modules
    CommonModule,
    MomentModule,
    ToastyModule,
    SlimLoadingBarModule,
    CalendarModule
  ]
})
export class SharedModule {}