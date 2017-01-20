import { Observable } from 'rxjs/Observable';
import { CloudinaryIntegrationService } from './../../../../services/cloudinary-integration.service';
import { Place } from './../../../../models/place';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tr-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  @Input() placeIndex: number;
  @Input() cityIndex: number;
  @Output() imageData = new EventEmitter();

  place: Place;
  cloudImages = [];
  

  constructor(private cloudinaryService: CloudinaryIntegrationService) { }

  ngOnInit() {
  }

  handleOnChange(event) {
    let files: any = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    let files_list = [];
    let pattern = /image-*/;
    for(let i=0; i < files.length; i++) {
      files_list.push(files[i]);
    }
    files_list.forEach((file: File) => {
      if (!file.type.match(pattern)) {
        alert('Remove non image format files');
        return;
      }  
      let reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    });
  }
    
  private handleReaderLoaded(e) {
    let reader = e.target;
    let imageUrl = reader.result;
    this.uploadMedia(imageUrl);
  }

  private uploadMedia(imageUrl: string) {
     let cloudUpload$:Observable<any> = this.cloudinaryService.uploadPlacePicture(imageUrl);
     cloudUpload$.subscribe(image => {
       this.imageData.emit({
         placeIndex: this.placeIndex,
         cityIndex: this.cityIndex,
         picture: { 
           url: image.url,
           public_id: image.public_id
         }
       });
     });
  }

}
