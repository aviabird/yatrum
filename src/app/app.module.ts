import { CanActivateViaAuthGuard } from './guards/auth.guard';
import { TripActivityComponent } from './containers/trips/trip-detail/trip-activity/trip-activity.component';
import { TripFlowChartComponent } from './containers/trips/trip-detail/trip-flow-chart/trip-flow-chart.component';
import { TripsListComponent } from './containers/trips/trips-list/trips-list.component';
import { TripEditComponent } from './containers/trips/trip-edit/trip-edit.component';
import { TripDetailComponent } from './containers/trips/trip-detail/trip-detail.component';
import { TripsComponent } from './containers/trips/trips.component';
// Core angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { HttpModule } from '@angular/http';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { StoreLogMonitorModule, useLogMonitor } from '@ngrx/store-log-monitor';
import { DatePickerModule } from 'ng2-datepicker';


// Services 
import { TripsService } from './services/trips.service';
import { UserAuthService } from './services/user-auth.service';
import { ServerAuthService } from './services/server-auth.service';
import { InstagramIntegrationService } from './instagram-integration.service';
import { CloudinaryIntegrationService } from './services/cloudinary-integration.service';

// Guards
import { TripsResolveGuard } from './guards/trips-resolve.guard';

// Effects
import { TripsEffects } from './effects/trips.effects';
import { UserAuthEffects } from './effects/user-auth.effect';
import { InstagramEffects } from './effects/instagram.effects';

import { routes } from './app.routes';
import { reducer } from './reducers/index';

//Directives
import { FileSelectDirective } from 'ng2-file-upload';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { InstagramAuthenticationCallbackComponent } from './components/instagram-authentication-callback/instagram-authentication-callback.component';
import { UserComponent } from './components/user/user.component';
import { UserSettingsComponent } from './components/user/user-settings/user-settings.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { UserTripsComponent } from './components/user/user-profile/user-trips/user-trips.component';
import { UserMediaComponent } from './components/user/user-profile/user-media/user-media.component';
import { SearchComponent } from './containers/search/search.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { SearchFilterComponent } from './components/search/search-filter/search-filter.component';
import { DashboardSearchFilterComponent } from './components/search/dashboard-search-filter/dashboard-search-filter.component';
import { TripsSearchFilterComponent } from './components/search/trips-search-filter/trips-search-filter.component';
import { DashboardSearchComponent } from './containers/dashboard/dashboard-search/dashboard-search.component';
import { DashboardTripsComponent } from './containers/dashboard/dashboard-trips/dashboard-trips.component';
import { TripListItemComponent } from './components/trips/trip-list-item/trip-list-item.component';
import { TripsSearchComponent } from './containers/search/trips-search/trips-search.component';
import { SearchedTripsComponent } from './containers/search/searched-trips/searched-trips.component';

const firebaseConfig = {
  apiKey: "AIzaSyDRiL-DZLnvLoj37YZNqQyYcOaOecXFOus",
  authDomain: "travel-app-frontend.firebaseapp.com",
  databaseURL: "https://travel-app-frontend.firebaseio.com",
  storageBucket: "travel-app-frontend.appspot.com"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TripsComponent,
    TripDetailComponent,
    TripsListComponent,
    TripFlowChartComponent,
    TripActivityComponent,
    LoginComponent,
    SignupComponent,
    InstagramAuthenticationCallbackComponent,
    UserComponent,
    UserSettingsComponent,
    UserSettingsComponent,
    TripEditComponent,
    UserProfileComponent,
    UserTripsComponent,
    UserMediaComponent,
    FileSelectDirective,
    SearchComponent,
    DashboardComponent,
    SearchFilterComponent,
    DashboardSearchFilterComponent,
    TripsSearchFilterComponent,
    DashboardSearchComponent,
    DashboardTripsComponent,
    TripListItemComponent,
    TripsSearchComponent,
    SearchedTripsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    StoreModule.provideStore(reducer),
    EffectsModule.run(UserAuthEffects),
    EffectsModule.run(TripsEffects),
    EffectsModule.run(InstagramEffects),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    RouterModule.forRoot(routes),
    DatePickerModule,
    // StoreDevtoolsModule.instrumentStore({
    //   monitor: useLogMonitor({
    //     visible: false,
    //     position: 'right'
    //   })
    // }),
    StoreLogMonitorModule,
  ],
  providers: [
    UserAuthService,
    TripsService,
    ServerAuthService,
    TripsResolveGuard,
    InstagramIntegrationService,
    CloudinaryIntegrationService,
    CanActivateViaAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
