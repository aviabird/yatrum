import { UpdateUser } from './../../../actions/user.action';
import { UserProfile } from './../../../models/user-profile';
import { UserService } from './../../../services/user.service';
import { getUserProfile, State } from './../../../reducers/index';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { InstagramIntegrationService } from './../../../services/instagram-integration.service';
import { environment as env } from './../../../../environments/environment';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'tr-user-settings',
  templateUrl: './user-settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  selectedLinkvalue: string = 'changePassword'; //DefaultValue
  isInstagramAuthStatusPresent: boolean = false;
  isInstagramAuthenticated: boolean = false;
  user$: Observable<UserProfile>

  constructor(private instaService: InstagramIntegrationService, 
              private store: Store<State>, 
              private userService: UserService) { 
    document.body.scrollTop = 0;
    // instaService.isUserInstagramAuthenticated()
    //   .subscribe(data => {
    //     this.isInstagramAuthenticated = data['instagram_authenticated'];
    //     this.isInstagramAuthStatusPresent = true;
    //   });

    // =======================================================
    // Select UserProfile
    this.user$ = this.store.select(getUserProfile);
  }

  ngOnInit() {
  }

  updateSocialLinks(data: any){
   this.store.dispatch(new UpdateUser(data));
  }

  onLoginWithInstagram() {
    window.location.href = `https://api.instagram.com/oauth/authorize/?client_id=${env.CLIENT_ID}&redirect_uri=${env.REDIRECT_URI}&response_type=code`;
  }

  changeSelectedLinkTo(value: string){
    this.selectedLinkvalue = value;
  }
}
