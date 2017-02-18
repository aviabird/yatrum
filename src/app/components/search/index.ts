import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search.component';
import { SharedModule } from '../../shared/index';
import { SearchedTripsComponent } from './searched-trips/searched-trips.component';
import { TripsSearchComponent } from './trips-search/trips-search.component';

const routes: Routes = [
  { path: 'search', component: SearchComponent},
];

@NgModule({
  declarations: [
    // components
    SearchComponent,
    SearchedTripsComponent,
    TripsSearchComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class SearchModule {}