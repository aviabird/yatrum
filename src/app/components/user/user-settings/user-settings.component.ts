import { InstagramIntegrationService } from './../../../services/instagram-integration.service';
import { environment as env } from './../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'tr-user-settings',
  templateUrl: './user-settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  isInstagramAuthStatusPresent: boolean = false;
  isInstagramAuthenticated: boolean = false;

  constructor(private instaService: InstagramIntegrationService) { 
    instaService.isUserInstagramAuthenticated()
      .subscribe(data => {
        this.isInstagramAuthenticated = data['instagram_authenticated'];
        this.isInstagramAuthStatusPresent = true;
      });
  }

  ngOnInit() {
  }

  onLoginWithInstagram() {
    window.location.href = `https://api.instagram.com/oauth/authorize/?client_id=${env.CLIENT_ID}&redirect_uri=${env.REDIRECT_URI}&response_type=code`;
  }

}
