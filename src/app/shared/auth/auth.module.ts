import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { SharedModule } from './../index';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { routing } from './auth.routing';
import { Routes, RouterModule } from '@angular/router';

@NgModule({
  imports: [
    routing,
    SharedModule,
    FormsModule,
    CustomFormsModule,
    ReactiveFormsModule
  ],
  declarations: [
   LoginComponent,
   SignupComponent
  ]
})
export class AuthModule {}
