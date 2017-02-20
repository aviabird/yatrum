import { UserService } from './../../../../services/user.service';
import { UserProfile } from './../../../../models/user-profile';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tr-other-details',
  templateUrl: './other-details.component.html',
  styleUrls: ['./other-details.component.scss']
})
export class OtherDetailsComponent implements OnInit {
  @Input() user: UserProfile;
  @Output() updateLinksClicked =  new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  onSubmitLinks(data: any){
    this.updateLinksClicked.emit(data);
  }
}
