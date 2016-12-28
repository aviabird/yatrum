import { Http } from '@angular/http';
import { environment as env } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class CloudinaryIntegrationService {
  private apiLink: string = `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}`;

  constructor(private http: Http) { }

  uploadImages(images) {
    const params = this.createUploadParams(images);
    console.log("file", images[0]);
    // this.upload(params)
    //   .subscribe(data => {
    //     console.log("response", data);
    //   })
  }
  
  private createUploadParams(images) {
    return {
      file: images[0].file,
      upload_preset: env.CLOUDINARY_UPLOAD_PRESET,
      pulic_id: 'travel_app'
    }
  }

  upload(params) {
    return this.http.post(`${this.apiLink}/image/upload`, JSON.stringify(params))
      .map(data => {
        console.log("data", data);
        return data;  
      });
  }

}