import { UserService } from './../../../../services/user.service';
import { UserProfile } from './../../../../models/user-profile';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tr-other-details',
  templateUrl: './other-details.component.html',
  styleUrls: ['./other-details.component.scss']
})
export class OtherDetailsComponent implements OnInit {
  @Input() user: UserProfile;
  constructor(private userService: UserService) { }

  ngOnInit() {
  }
  updateSocialLinks(data: any){
   console.log("data is", data);
   this.userService.updateSocialLinks(data).subscribe(response => {
     console.log(response);
   });
  }


}
