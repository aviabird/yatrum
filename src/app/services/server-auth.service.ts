import { Observable } from 'rxjs/Observable';
import { UserProfile } from './../models/user-profile';
import { Http, Headers, Response } from '@angular/http';
// Users JWT TOKEN authentication connects with rails api
import { Injectable } from '@angular/core';
// import {LocalStorageService} from "angular2-localstorage/LocalStorageEmitter";
// import {LocalStorage, SessionStorage} from "angular2-localstorage/WebStorage";


@Injectable()
export class ServerAuthService {
  // @LocalStorage() public token:Object = {};
  private apiLink:string = "http://localhost:3000";

  constructor(private http: Http) {}

  getLoggedInUser(auth_token) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': auth_token
    })
    return this.http.post(this.apiLink + '/users/show' + '.json', {}, {headers: headers})
      .map(data => this.getServerUserProfile(data.json()))
      // .map(data => this.getServerUserProfile(data));
  }

   // returns an observable with user object
  login(data) {
    const headers = new Headers({
      'Content-Type': 'application/json' 
    });
    return this.http.post(this.apiLink + '/authenticate' + '.json', 
      JSON.stringify(data), {headers: headers}
    ).map((res: Response) => {
      this.setTokenInLocalStorage(res.json())
      return res.json();
    })
  }

  signOut() {
    localStorage.removeItem('user');
    return Observable.of('ok logged out');
  }

  getServerUserProfile(data): UserProfile {
    return {
            name: data.user.name,
            email: data.user.email,
            photoURL: data.user.photoURL,
            token: data.auth_token
        }
  }

  setTokenInLocalStorage(user_data) {
    let jsonData = JSON.stringify(user_data)
    localStorage.setItem('user', jsonData);
  }

}
