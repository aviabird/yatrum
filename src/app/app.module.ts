// Core angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { StoreLogMonitorModule, useLogMonitor } from '@ngrx/store-log-monitor';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Services 
import { ServiceModule } from './services/index';
import { routes } from './app.routes';
import { reducer } from './reducers/index';

//Directives
import { Autosize } from 'angular2-autosize/angular2-autosize';
import { TripHasPlaces } from './Validators/trip-has-places.directive';

// Components
import { AppComponent } from './app.component';
import { AmbassadorComponent } from './components/misc/ambassador/ambassador.component';
// Satellizer Module
import { Ng2UiAuthModule, CustomConfig } from 'ng2-ui-auth';
import { MyAuthConfig } from './auth-config';

import { AppEffectsModule } from './effects/index';
import { ComponentsModule } from './components/index';
import { SharedModule } from './shared/index';
import { CanActivateViaAuthGuard } from './guards/auth.guard';
import { TripsResolveGuard } from './guards/trips-resolve.guard';
import { InstagramAuthenticationCallbackComponent } from './shared/instagram-authentication-callback/instagram-authentication-callback.component';

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
    Autosize,
    TripHasPlaces,
    AmbassadorComponent,
    InstagramAuthenticationCallbackComponent
  ],
  imports: [
    BrowserModule,
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
    
    ComponentsModule,
    SharedModule,
    ServiceModule,
    AppEffectsModule
  ],
  providers: [
    CanActivateViaAuthGuard,
    TripsResolveGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
