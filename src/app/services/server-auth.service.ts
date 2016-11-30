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

  constructor(private http: Http) {
    // this.token = 'Ashish';
    localStorage.setItem('token', "testing");
    console.log('set ashish as a value');
    this.login();
  }

   // returns an observable with user object
  login() {
    const headers = new Headers({
      'Content-Type': 'application/json' 
    });
    console.log('in signin method');
    return this.http.post(this.apiLink + '/authenticate' + '.json', 
      JSON.stringify({email: 'ashish1@gmail.com', password: '123456789'}), {headers: headers}
    ).map((res: Response) => res.json())
    // subscribe(
    //   (response: Response) => {
    //     console.log('response', response);
    //     let token = response.json() && response.json().auth_token;
    //     let user = response.json() && response.json().user;
    //     console.log('token', token);
    //     console.log('token', user);
    //   });
    // .map(data => console.log("sent a request", data));
  }

  getServerUserProfile(data): UserProfile {
    return {
            name: data.user.name,
            email: data.user.email,
            photoURL: data.user.photoURL,
            token: data.auth_token
        }
  }

}
