import { UpdateLoginFormNotification } from './../actions/notification.action';
import { Observable } from 'rxjs/Observable';
import { UserProfile } from './../models/user-profile';
import { Http, Headers, Response } from '@angular/http';
// Users JWT TOKEN authentication connects with rails api
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';

@Injectable()
export class ServerAuthService {
  // @LocalStorage() public token:Object = {};
  private apiLink:string = "http://localhost:3000";

  constructor(private http: Http,
              private store: Store<fromRoot.State>) {}

  getLoggedInUser(auth_token) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': auth_token
    })
    return this.http.post(`${this.apiLink}/users/show.json`, {}, {headers: headers})
      .map(data => this.getServerUserProfile(data.json()))
  }

   // returns an observable with user object
  login(data) {
    const headers = new Headers({
      'Content-Type': 'application/json' 
    });
    console.log('in login method');
    return this.http.post(`${this.apiLink}/authenticate.json`, 
      JSON.stringify(data), {headers: headers}
    ).map((res: Response) => {
      this.setTokenInLocalStorage(res.json())
      return res.json();
    }).catch(this.catchError);
    // catch should be handled here with the http observable 
    // so that only the inner obs dies and not the effect Observable
    // otherwise no further login requests will be fired
    // MORE INFO https://youtu.be/3LKMwkuK0ZE?t=24m29s
  }

  catchError(response: Response) {
      // not returning throw as it raises an error on the parent observable 
      // MORE INFO at https://youtu.be/3LKMwkuK0ZE?t=24m29s    
      return Observable.of('server error');
  }

  signOut() {
    localStorage.removeItem('user');
    return Observable.of('ok logged out');
  }

  getServerUserProfile(data): UserProfile {
    return { id: '',
            name: data.user.name,
            email: data.user.email,
            photoURL: data.user.photoURL,
            token: data.auth_token,
            created_at: '',
            updated_at: ''
        }
  }

  setTokenInLocalStorage(user_data) {
    let jsonData = JSON.stringify(user_data)
    localStorage.setItem('user', jsonData);
  }

}
