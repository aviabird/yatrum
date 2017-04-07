// Core angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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


// adding rx operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/of';


@NgModule({
  declarations: [
    AppComponent,
    Autosize,
    TripHasPlaces,
    AmbassadorComponent,
    InstagramAuthenticationCallbackComponent,
  ],
  imports: [
    BrowserModule,
    Ng2UiAuthModule.forRoot(MyAuthConfig),
    StoreModule.provideStore(reducer),
    RouterModule.forRoot(routes),
    ComponentsModule,
    SharedModule,
    ServiceModule,
    AppEffectsModule,
    BrowserAnimationsModule
  ],
  providers: [
    CanActivateViaAuthGuard,
    TripsResolveGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
