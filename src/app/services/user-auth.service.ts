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

    getUserProfile(data: any): UserProfile {
        console.log("profile data",data);
        
    }

}