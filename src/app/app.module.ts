import { TripsEffects } from './effects/trips.effects';
import { TripsService } from './services/trips.service';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import { UserAuthService } from './services/user-auth.service';
import { UserAuthEffects } from './effects/user-auth.effect';
import { developmentReducers } from './reducers/index';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TripsComponent } from './components/trips/trips.component';
import { TripDetailComponent } from './components/trips/trip-detail/trip-detail.component';
import { TripsListComponent } from './components/trips/trips-list/trips-list.component';
import { TripFlowChartComponent } from './components/trips/trip-detail/trip-flow-chart/trip-flow-chart.component';
import { TripActivityComponent } from './components/trips/trip-detail/trip-activity/trip-activity.component';

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
    DashboardComponent,
    TripsComponent,
    TripDetailComponent,
    TripsListComponent,
    TripFlowChartComponent,
    TripActivityComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    StoreModule.provideStore(developmentReducers),
    EffectsModule.run(UserAuthEffects),
    EffectsModule.run(TripsEffects),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    RouterModule.forRoot(routes)
  ],
  providers: [UserAuthService, TripsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
