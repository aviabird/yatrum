// Inbuilt Angular Modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { SharedModule } from '../../../shared/index';

/**Required Components */
import { UserMediaComponent } from './user-media/user-media.component';
import { UserTripsComponent } from './user-trips/user-trips.component';
import { UserFollowingComponent } from './user-following/user-following.component';
import { UserFollowersComponent } from './user-followers/user-followers.component';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileRoutes } from './user-profile.routes';

const routes: Routes = [
  { path: '', component: UserProfileComponent, children: UserProfileRoutes }
];

@NgModule({
  declarations: [
    // components
    UserProfileComponent,
    UserFollowersComponent,
    UserFollowingComponent,
    UserMediaComponent,
    UserTripsComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    InfiniteScrollModule
  ]
})
export class UserProfileModule {}