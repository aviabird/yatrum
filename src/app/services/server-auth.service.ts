import { UpdateLoginFormNotification } from './../actions/notification.action';
import { Observable } from 'rxjs/Observable';
import { UserProfile } from './../models/user-profile';
import { Http, Headers, Response } from '@angular/http';
// Users JWT TOKEN authentication connects with rails api
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { environment } from './../../environments/environment';


@Injectable()
export class ServerAuthService {
  // @LocalStorage() public token:Object = {};
  private apiLink:string = environment.API_ENDPOINT; // "http://localhost:3000";

  constructor(private http: Http,
              private store: Store<fromRoot.State>) {}

  getLoggedInUser(auth_token): Observable<any> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': auth_token
    })
    return this.http.post(`${this.apiLink}/users/show.json`, {}, {headers: headers})
      .map(data => this.getServerUserProfile(data.json()))
  }

   // returns an observable with user object
  login(data): Observable<Object> {
    const headers = new Headers({
      'Content-Type': 'application/json' 
    });
    return this.http.post(`${this.apiLink}/authenticate.json`, 
      JSON.stringify(data), {headers: headers}
    ).map((res: Response) => {
      // Setting token after login
      this.setTokenInLocalStorage(res.json())
      return res.json();
    }).catch(this.catchError);
    // catch should be handled here with the http observable 
    // so that only the inner obs dies and not the effect Observable
    // otherwise no further login requests will be fired
    // MORE INFO https://youtu.be/3LKMwkuK0ZE?t=24m29s
  }

  /**
   * signUp method
   */
  signUp(data): Observable<Object>|any {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    console.log('in signup method');
    return this.http.post(`${this.apiLink}/users/create.json`,
      JSON.stringify(data), {headers: headers})
        .map((resp: Response) => resp.json())
        .catch(this.catchError);
  }

  catchError(response: Response): Observable<String> {
      console.log('in catch error method');
      // not returning throw as it raises an error on the parent observable 
      // MORE INFO at https://youtu.be/3LKMwkuK0ZE?t=24m29s    
      return Observable.of('server error');
  }

  signOut(): Observable<String> {
    localStorage.removeItem('user');
    return Observable.of('ok logged out');
  }

  getServerUserProfile(data): UserProfile {
    return { id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            profilePic: data.user.profile_pic,
            coverPhoto: data.user.cover_photo,
            token: data.auth_token,
            created_at: '',
            updated_at: ''
        }
  }

  setTokenInLocalStorage(user_data): void {
    let jsonData = JSON.stringify(user_data)
    localStorage.setItem('user', jsonData);
  }

}
