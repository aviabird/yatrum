import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TripsComponent } from './trips.component';

const routes: Routes = [
  { path: '', component: TripsComponent },
  { path: 'new', loadChildren: './trip-edit/trip-edit.module#TripEditModule' },
  { path: ':id', loadChildren: './trip-detail/trip-detail.module#TripDetailModule' },
  { path: ':id/edit', loadChildren: './trip-edit/trip-edit.module#TripEditModule' }
];

@NgModule({
  declarations: [
    // components
    TripsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class TripsModule { }