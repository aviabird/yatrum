import { Observable } from 'rxjs/Observable';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class UserAuthService implements OnInit {
    private auth$: Observable<any>;
    private user: any;

    constructor(private af: AngularFire) {
        this.auth$ = this.af.auth;
    }

    ngOnInit() {
        this.auth$.subscribe(
            data => {
                this.user = this.sanitiseData(data);
            }
        )
    }

    signIn() {
        return Observable.create(observer => {
            this.af.auth.login({
                provider: AuthProviders.Google,
                method: AuthMethods.Popup
            })
            observer.next(this.user);
            //TODO: HANDLE ERROR LATER
        });
    }

    sanitiseData(data) {
        console.log(data)
        return data;
    }

}