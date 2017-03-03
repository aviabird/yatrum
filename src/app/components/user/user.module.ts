// Inbuilt Angular Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { UserComponent } from './user.component';
import { UserRoutes } from './user.routes';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserFollowersComponent } from './user-profile/user-followers/user-followers.component';
import { UserFollowingComponent } from './user-profile/user-following/user-following.component';
import { UserMediaComponent } from './user-profile/user-media/user-media.component';
import { UserTripsComponent } from './user-profile/user-trips/user-trips.component';
import { SharedModule } from '../../shared/index';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { OtherDetailsComponent } from './user-settings/other-details/other-details.component';
import { ChangePasswordComponent } from './user-settings/change-password/change-password.component';

const routes: Routes = [
  { path: '', component: UserComponent, children: UserRoutes },
];

@NgModule({
  declarations: [
    // components
    UserComponent,
    UserProfileComponent,
    UserFollowersComponent,
    UserFollowingComponent,
    UserMediaComponent,
    UserSettingsComponent,
    OtherDetailsComponent,
    UserTripsComponent,
    ChangePasswordComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    InfiniteScrollModule
  ]
})
export class UserModule {}
