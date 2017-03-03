import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/index';
/**Social Share Button  */
import { ShareButtonsModule } from "ng2-sharebuttons";

/**Action Cable */
import { Ng2Cable, Broadcaster } from 'ng2-cable/js/index';

/**Required Components */
import { TripDetailHeaderComponent } from './trip-detail-header/trip-detail-header.component';
import { TripActivityComponent } from './trip-activity/trip-activity.component';
import { TripCommentComponent } from './trip-comment/trip-comment.component';
import { PlaceDetailComponent } from './place-detail/place-detail.component';
import { NewTripCommentComponent } from './new-trip-comment/new-trip-comment.component';
import { TripDetailComponent } from './trip-detail.component';

import { TripsResolveGuard } from './../../../guards/trips-resolve.guard';

const routes: Routes = [
  { path: '', component: TripDetailComponent,
    resolve: {
      trip: TripsResolveGuard
    } 
  }
];

@NgModule({
  declarations: [
    // components
    TripDetailComponent,
    NewTripCommentComponent,
    PlaceDetailComponent,
    TripActivityComponent,
    TripCommentComponent,
    TripDetailHeaderComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ShareButtonsModule.forRoot()
  ],
    providers: [
    Ng2Cable,
    Broadcaster
  ],
})
export class TripDetailModule { }