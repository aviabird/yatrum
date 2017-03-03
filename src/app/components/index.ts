import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchModule } from './search/index';
// import { UserModule } from './user/index';
// import { DashboardModule } from './dashboard/index';
import { TripsModule } from './trips/index';

@NgModule({
  imports: [
    // DashboardModule,
    SearchModule,
    // UserModule,
    TripsModule
  ]
})
export class ComponentsModule { }