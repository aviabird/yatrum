// Inbuilt Angular Modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';

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

const routes: Routes = [
  { path: 'user', component: UserComponent, children: UserRoutes },
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
    UserTripsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule
  ]
})
export class UserModule {}