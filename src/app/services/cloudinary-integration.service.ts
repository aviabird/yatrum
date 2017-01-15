import { ToastyService } from 'ng2-toasty';
import { Observable } from 'rxjs/Observable';
import { SelectedProfileUserAction, UserUpdateSuccessAction } from './../actions/user-auth.action';
import { State, getSelectedProfileUser } from './../reducers/index';
import { Store } from '@ngrx/store';
import { Http, Headers } from '@angular/http';
import { environment as env } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';


@Injectable()
export class CloudinaryIntegrationService {
  private cloudinaryApiLink: string = `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}`;
  private apiLink:string = environment.API_ENDPOINT; // "http://localhost:3000";
  private auth_token: string;
  private user$: Observable<any>;
  private toUpdateMediaPublicId: string = null;

  constructor(
    private http: Http,
    private store: Store<State>,
    private slimLoadingBarService: SlimLoadingBarService,
    private toastyService: ToastyService
  ) { 
    let user_data = JSON.parse(localStorage.getItem('user'));
    if (user_data) {
      this.auth_token = user_data.auth_token;
    }
  }

  uploadImages(image, mediaType) {
    this.user$ = this.store.select(getSelectedProfileUser);
    
    this.user$.subscribe(user => {
      debugger
      this.toUpdateMediaPublicId = user.profile_pic['public_id'];
    })
    let params = this.createUploadParams(image);
    this.upload(params)
      .subscribe(data => {
        this.update_user_profile_media(data, mediaType);
      })
  }

  private update_user_profile_media(data, mediaType) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.auth_token
    })
    const params = {
      mediaType: mediaType,
      url: data.secure_url, 
      public_id: data.public_id
    }
    return this.http.post(`${this.apiLink}/update_user_profile_media`, params, {headers: headers})
      .map(response => response.json())
      .subscribe(data => {
        let payload = { 
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          profilePic: data.user.profile_pic,
          coverPhoto: data.user.cover_photo,
          token: data.auth_token,
          created_at: '',
          updated_at: ''
        }
        this.store.dispatch(new SelectedProfileUserAction(payload));
        this.store.dispatch(new UserUpdateSuccessAction(payload));
      });
  }

  private createUploadParams(image) {
    return {
      file: image,
      upload_preset: env.CLOUDINARY_UPLOAD_PRESET,
      pulic_id: 'travel_app'
    }
  }

  upload(params) {
    console.log("upload");
    this.slimLoadingBarService.start();
    return this.http.post(`${this.cloudinaryApiLink}/image/upload`, params)
      .map(
        data => data.json(),
        error => this.toastyService.error({ title: "Server Error", msg: "Something went wrong !!!" })
      ).finally(() => this.slimLoadingBarService.complete());
  }

}