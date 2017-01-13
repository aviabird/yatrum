import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class InstagramIntegrationService {
  private auth_token: string;
  private apiLink:string = environment.API_ENDPOINT; // "http://localhost:3000";

  constructor(private http: Http) {
    let user_data = JSON.parse(localStorage.getItem('user'));
    if (user_data) {
      this.auth_token = user_data.auth_token;
    }
  }

// This method will exchange code with instagram access token
// for more information, visit https://www.instagram.com/developer/authentication/
  exchangeCodeWithToken(code: string): Observable<string> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.auth_token
    })
    return this.http.post(`${this.apiLink}/exchange_code_with_token`, {code: code}, { headers: headers })
		  .map(data => data.json());
  }

  isUserInstagramAuthenticated(): Observable<boolean> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.auth_token
    })
    return this.http.get(`${this.apiLink}/is_user_instagram_authenticated`, { headers: headers })
      .map(data => data.json());    
  }

  getUserInstagramMedia(): Observable<Object> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.auth_token
    })
    return this.http.get(`${this.apiLink}/get_user_instagram_media`, { headers: headers })
      .map(data => data.json());
  }

}
