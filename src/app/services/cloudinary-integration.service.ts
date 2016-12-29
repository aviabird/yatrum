import { Http, Headers } from '@angular/http';
import { environment as env } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class CloudinaryIntegrationService {
  private cloudinaryApiLink: string = `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}`;
  private serverLink: string = "http://localhost:3000";
  private auth_token: string;

  constructor(private http: Http) { 
    let user_data = JSON.parse(localStorage.getItem('user'));
    if (user_data) {
      this.auth_token = user_data.auth_token;
    }
  }

  uploadImages(image) {
    let params = this.createUploadParams(image);
    this.upload(params)
      .subscribe(data => {
        this.update_user_profile_media(data);
      })
  }

  private update_user_profile_media(data) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.auth_token
    })
    const params = {
      url: data.secure_url, 
      public_id: data.public_id
    }
    return this.http.post(`${this.serverLink}/update_user_profile_media`, params, {headers: headers})
      .subscribe(data => console.log("success"));
  }


  private createUploadParams(image) {
    return {
      file: image,
      upload_preset: env.CLOUDINARY_UPLOAD_PRESET,
      pulic_id: 'travel_app'
    }
  }

  upload(params) {
    return this.http.post(`${this.cloudinaryApiLink}/image/upload`, params)
      .map(data => data.json());
  }

}