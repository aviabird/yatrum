import { UserProfile } from './../models/user-profile';
import { Observable } from 'rxjs/Observable';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class UserAuthService {

    constructor(private af: AngularFire) {}

    signIn() {
        this.af.auth.login({
            provider: AuthProviders.Google,
            method: AuthMethods.Popup
        })
        return this.af.auth;
    }

    signOut() {
        this.af.auth.logout();
        return this.af.auth;
    }

    getUserProfile(data: any): UserProfile {
        return {
            name: data.google.displayName,
            email: data.google.email,
            photoURL: data.google.photoURL
        }

    }

}