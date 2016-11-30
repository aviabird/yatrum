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
    this.http.post(this.apiLink + '/authenticate' + '.json', 
      JSON.stringify({email: 'ashish1@gmail.com', password: '123456789'}), {headers: headers}
    ).subscribe(data => console.log("Data from backend", data))
    // .map(data => console.log("sent a request", data));
  }

}
