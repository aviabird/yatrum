import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { UserRoutes } from './user.routes';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserFollowersComponent } from './user-profile/user-followers/user-followers.component';
import { UserFollowingComponent } from './user-profile/user-following/user-following.component';
import { UserMediaComponent } from './user-profile/user-media/user-media.component';
import { UserTripsComponent } from './user-profile/user-trips/user-trips.component';
import { SharedModule } from '../../shared/index';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { ChangePasswordComponent } from './user-settings/change-password/change-password.component';

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
    UserTripsComponent,
    ChangePasswordComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class UserModule {}
