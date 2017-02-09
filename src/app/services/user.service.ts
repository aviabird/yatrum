import { SelectedProfileUserAction } from './../actions/user-auth.action';
import { State } from './../reducers/index';
import { Store } from '@ngrx/store';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class UserService {

  private apiLink:string = environment.API_ENDPOINT; // "http://localhost:3000";

  constructor(private http: Http, private store: Store<State>) {}

	getUserAuthToken() {
		let user_data = JSON.parse(localStorage.getItem('user'));
		if (user_data) {
			return user_data.auth_token;
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
          id: data.id,
          name: data.name,
          email: data.email,
          profilePic: data.profile_pic,
          coverPhoto: data.cover_photo,
          isFollowed: data.is_followed_by_current_user,
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
      'Authorization': this.getUserAuthToken()    
    })
    return this.http.post(`${this.apiLink}/add_to_user_following_list`, {followed_id: id}, {headers: headers})
      .map(response => response.json());
  }

  getUserFollowers(id: string) {
    return this.http.post(`${this.apiLink}/user_followers`, {user_id: id})
      .map(response => response.json());
  }

  getUserFollowing(id: string) {
    return this.http.post(`${this.apiLink}/user_following`, {user_id: id})
      .map(response => response.json());
  }
   
}
