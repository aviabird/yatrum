import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { FollowProfileUserAction } from './../../../actions/user.action';
import { getLoggedInUserId, getSelectedProfileUser, State } from './../../../reducers/index';
import { UserService } from './../../../services/user.service';
import { CloudinaryIntegrationService } from './../../../services/cloudinary-integration.service';
import { UserProfile } from './../../../models/user-profile';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import {
  Component,
  OnInit,
  OnDestroy,
  trigger,
  state,
  transition,
  style,
  animate
} from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

declare var $: any;

@Component({
  selector: 'tr-user-profile',
  templateUrl: './user-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./user-profile.component.scss'],
  animations: [
    trigger('flyInDown', [
      state('in', style({ })),
      transition('void => *', [
        style({ top: "-5%", opacity: 0 }),
        animate(500)
      ])
    ])
  ]
})
export class UserProfileComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  public userIndex: string;
  public loaded: boolean = false;
  public profilePicSrc: string = '';
  public coverPhotoSrc: string = '';
  public loggedUserId$: Observable<string>;
  private mediaType: string = '';
  public isProfilPicChanged: boolean = false;
  public selectedProfileUser$: Observable<UserProfile>;
  public selectedUser;

  constructor(private store: Store<State>, private activatedRoute: ActivatedRoute, 
              private cloudinaryService: CloudinaryIntegrationService,
              private slimLoadingBarService :SlimLoadingBarService,
              private userService: UserService) {
    document.body.scrollTop = 0;
    this.loggedUserId$ = this.store.select(getLoggedInUserId);
    this.selectedProfileUser$ = this.store.select(getSelectedProfileUser)
      .do((user) => this.selectedUser = user);

    this.cloudinaryService.uploading.subscribe(response => {
      if(response)
        this.slimLoadingBarService.start();
      else
        this.slimLoadingBarService.complete();  
    });

  }

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe(
      (params) => {
        this.userIndex = params['id']
        this.userService.getUserById(this.userIndex);
      }
    )
    this.selectedProfileUser$.subscribe(user => console.log("user", user));
  }
    
  handleInputChange(e) {
    let file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    let pattern = /image-*/;
    let reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
    
  private handleReaderLoaded(e) {
    let reader = e.target;
    if(this.isProfilPicChanged)
      this.profilePicSrc = reader.result;
    else 
      this.coverPhotoSrc = reader.result;
    this.loaded = true;
    this.uploadMedia();
  }

  private uploadMedia() {
    if(this.isProfilPicChanged)
      this.cloudinaryService.uploadImages(this.profilePicSrc, this.mediaType);
    else
      this.cloudinaryService.uploadImages(this.coverPhotoSrc, this.mediaType);
}

  onUpdateProfilePicture() {
    let isLoggedInUser = false;
    this.loggedUserId$.subscribe(id => {
      if(id == this.userIndex)
        isLoggedInUser = true;
    })
    if(!isLoggedInUser)
      return;
      
    this.profilePicSrc = '';
    this.loaded = false;
    this.isProfilPicChanged = true;
    $('#selectMedia').click();
    this.mediaType = 'profile_pic';
  }

  onUpdateCoverPhoto() {
    this.coverPhotoSrc = '';
    this.loaded = false;
    this.isProfilPicChanged = false;
    $('#selectMedia').click();
    this.mediaType = 'cover_photo';
  }

  userFollowState() {
    return this.selectedUser.is_followed_by_current_user ? 'active' : 'inactive';
  }

  onToggleFollow() {
    this.store.dispatch(new FollowProfileUserAction(this.selectedUser.id));
  }

  visitSocialLink(link) {
    console.log("link", link);
    window.open(link);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
