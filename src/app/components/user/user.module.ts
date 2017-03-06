// Inbuilt Angular Modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { UserComponent } from './user.component';
import { SharedModule } from '../../shared/index';

const routes: Routes = [
  { path: '', component: UserComponent },
	{ path: 'settings', loadChildren: './user-settings/user-settings.module#UserSettingsModule' },
  { path: ':id', loadChildren: './user-profile/user-profile.module#UserProfileModule'},
];

@NgModule({
  declarations: [
    // components
    UserComponent
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
export class UserModule {}
