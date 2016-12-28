import { CloudinaryIntegrationService } from './../../../services/cloudinary-integration.service';
import { environment as env} from './../../../../environments/environment';
import { LoadUserTripsAction } from './../../../actions/trips.action';
import { ActivatedRoute } from '@angular/router';
import { State } from './../../../reducers/index';
import { Subscription } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';


@Component({
  selector: 'tr-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  private URL = `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}/image/upload`

  private subscription: Subscription;
  private userIndex: string;
  public uploader: FileUploader = new FileUploader({url: this.URL});

  constructor(private store: Store<State>, private activatedRoute: ActivatedRoute, private cloudinaryService: CloudinaryIntegrationService) {}

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe(
      (params) => this.userIndex = params['id']
    )
    this.store.dispatch(new LoadUserTripsAction(this.userIndex));
  }

  onUpload() {
    this.cloudinaryService.uploadImages(this.uploader.queue);
  }

}
