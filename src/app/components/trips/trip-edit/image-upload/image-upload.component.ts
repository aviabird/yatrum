import { State, getLoggedInUserId } from './../../../../reducers/index';
import { Store } from '@ngrx/store';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Observable } from 'rxjs/Observable';
import { CloudinaryIntegrationService } from './../../../../services/cloudinary-integration.service';
import { Place } from './../../../../models/place';
import { Component, OnInit, Input, Output, EventEmitter, Renderer, ElementRef, ViewChild, ChangeDetectionStrategy
} from '@angular/core';


@Component({
  selector: 'tr-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageUploadComponent implements OnInit {
  @Output() imageData = new EventEmitter();
  @ViewChild('fileInput') fileInput: ElementRef;
  imagesToUpload = [];
  totalImagesToUpload: number = 0;
  loggedInUserId: string;
  constructor(private cloudinaryService: CloudinaryIntegrationService,
    private slimLoadingBarService: SlimLoadingBarService,
    private renderer: Renderer,
    private store: Store<State>) {

    this.cloudinaryService.uploading.subscribe(response => {
      if(response)
        this.slimLoadingBarService.start();
      else
        this.slimLoadingBarService.complete();  
    });

    /**Get Looged In User Id to pass to picture */
    this.store.select(getLoggedInUserId)
      .subscribe(id => this.loggedInUserId = id);
  }

  ngOnInit() {
  }

  handleOnChange(event) {
    let files: any = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    let files_list = [];
    this.totalImagesToUpload = 0;
    let pattern = /image-*/;
    for (let i = 0; i < files.length; i++) {
      files_list.push(files[i]);
    }
    files_list.forEach((file: File) => {
      if (!file.type.match(pattern)) {
        alert('Remove non image format files');
        return;
      }
      this.totalImagesToUpload++;
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
    let cloudUpload$: Observable<any> = this.cloudinaryService.uploadPlacePicture(imageUrl, this.totalImagesToUpload);
    cloudUpload$.subscribe(image => {
      this.imageData.emit({
        id: null,
        description: '',
        url: image.url,
        public_id: image.public_id,
        user_id: this.loggedInUserId,
        _destroy: false
      })
    })
  }

  showImageBrowseDlg() {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      this.fileInput.nativeElement, 'dispatchEvent', [event]);
  }

  // TODO: Destroy Subscription
  ngOnDestory(){
    
  }

}
