// Inbuilt Angular Modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { SharedModule } from '../../../shared/index';
import { CanActivateViaAuthGuard } from './../../../guards/auth.guard';

/**Required Components */
import { OtherDetailsComponent } from './other-details/other-details.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserSettingsComponent } from './user-settings.component';
import { EqualValidator } from '../../../Validators/equal-validator.directive';


const routes: Routes = [
  { path: '', component: UserSettingsComponent, canActivate: [ CanActivateViaAuthGuard ] }
];

@NgModule({
  declarations: [
    // components
    UserSettingsComponent,
    ChangePasswordComponent,
    OtherDetailsComponent,
    EqualValidator
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
export class UserSettingsModule {}