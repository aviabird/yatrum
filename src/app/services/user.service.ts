import { SelectedProfileUserAction } from './../actions/user-auth.action';
import { State } from './../reducers/index';
import { Store } from '@ngrx/store';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class UserService {

  private apiLink:string = environment.API_ENDPOINT; // "http://localhost:3000";
  private authToken: string;

  constructor(private http: Http, private store: Store<State>) { 
    let user_data = JSON.parse(localStorage.getItem('user'));
    if (user_data) {
      this.authToken = user_data.auth_token;
    }
  }

  getUserById(id: string) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    })
    return this.http.post(`${this.apiLink}/users/get_user_by_id`, {user_id: id}, {headers: headers})
      .map(response => response.json())
      .subscribe(data => {
        let payload = { 
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          profilePic: data.user.profile_pic,
          coverPhoto: data.user.cover_photo,
          trips: {
            ids: [],
            trips: {}
          },
          token: data.auth_token,
          created_at: '',
          updated_at: ''
        }
        this.store.dispatch(new SelectedProfileUserAction(payload));
      });
  }

  addTravellerToFollowingList(id: string) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.authToken    
    })
    return this.http.post(`${this.apiLink}/add_to_user_following_list`, {followed_id: id}, {headers: headers})
      .map(response => response.json());
  }

}
