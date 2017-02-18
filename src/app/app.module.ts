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
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ToastyModule } from 'ng2-toasty';
import { DatepickerModule } from 'angular2-material-datepicker';
import { CalendarModule } from 'primeng/primeng';

// Pipes

// Services 
import { ServiceModule } from './services/index';

// Guards
import { TripsResolveGuard } from './guards/trips-resolve.guard';
import { CanActivateViaAuthGuard } from './guards/auth.guard';

import { routes } from './app.routes';
import { reducer } from './reducers/index';

//Directives
import { FileSelectDirective } from 'ng2-file-upload';
import { Autosize } from 'angular2-autosize/angular2-autosize';
import { TripHasPlaces } from './Validators/trip-has-places.directive';

// Components
import { AppComponent } from './app.component';
import { InstagramAuthenticationCallbackComponent } from './components/shared/instagram-authentication-callback/instagram-authentication-callback.component';
import { AmbassadorComponent } from './components/misc/ambassador/ambassador.component';

// Satellizer Module
import { Ng2UiAuthModule, CustomConfig } from 'ng2-ui-auth';
import { MyAuthConfig } from './auth-config';
import { AppEffectsModule } from './effects/index';
import { ComponentsModule } from './components/index';
import { SharedModule } from './components/shared/index';




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
    InstagramAuthenticationCallbackComponent,
    FileSelectDirective,
    Autosize,
    TripHasPlaces,
    AmbassadorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    ReactiveFormsModule,
    HttpModule,
    Ng2UiAuthModule.forRoot(MyAuthConfig),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    RouterModule.forRoot(routes),
    //TODO: Fix this when AOT error is resolved
    // StoreDevtoolsModule.instrumentStore({
    //   monitor: useLogMonitor({
    //     visible: false,
    //     position: 'right'
    //   })
    // }),
    StoreLogMonitorModule,
    SlimLoadingBarModule.forRoot(),
    ToastyModule.forRoot(),
    DatepickerModule,
    CalendarModule,
    ComponentsModule,
    SharedModule,
    ServiceModule,
    AppEffectsModule
  ],
  providers: [
    TripsResolveGuard,
    CanActivateViaAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
