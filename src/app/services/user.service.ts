import { SelectedProfileUserAction } from './../actions/user-auth.action';
import { State } from './../reducers/index';
import { Store } from '@ngrx/store';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class UserService {

  private apiLink: string = environment.API_ENDPOINT; // "http://localhost:3000";

  constructor(private http: Http, private store: Store<State>) { }

  getUserAuthToken() {
    let user_data = JSON.parse(localStorage.getItem('user'));
    if (user_data) {
      return user_data.auth_token;
    }
  }

  getUserById(id: string) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.getUserAuthToken()
      // use Restangular which creates interceptor
    });
    return this.http.post(`${this.apiLink}/users/get_user_by_id`, { user_id: id }, { headers: headers })
      .map(response => response.json())
      .subscribe(data => {
        this.store.dispatch(new SelectedProfileUserAction(data));
      });
  }

  addTravellerToFollowingList(id: string) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.getUserAuthToken()
    })
    return this.http.post(`${this.apiLink}/add_to_user_following_list`, { followed_id: id }, { headers: headers })
      .map(response => response.json());

  }

  getUserFollowers(id: string) {
    return this.http.post(`${this.apiLink}/user_followers`, { user_id: id })
      .map(response => response.json());
  }

  getUserFollowing(id: string) {
    return this.http.post(`${this.apiLink}/user_following`, { user_id: id })
      .map(response => response.json());
  }

  updateSocialLinks(data: any) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.getUserAuthToken()
      // use Restangular which creates interceptor
    });

    return this.http.post(`${this.apiLink}/users/update_social_links`, { user: data }, { headers: headers })
      .map(response => response.json());
  }

  // TODO: need to change the dirty implematation
  changePassword(current_password, new_password, confirm_password) {
    console.log("Inside change password method", current_password, new_password, confirm_password)

    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.getUserAuthToken()
    })

    return this.http.post(`${this.apiLink}/update_password`, {
      current_password: current_password,
      password: new_password,
      password_confirmation: confirm_password,
    }, { headers: headers }).map(response => response.json());
  }

  getUserPictures(id: string) {
    return this.http.post(`${this.apiLink}/user_pictures`, { user_id: id })
      .map(response => {
        console.log(response.json().user_pictures)
        return response.json().user_pictures
      });
  }


}
