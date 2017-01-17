import { UserService } from './../../../../services/user.service';
import { LoadUserFollowersAction } from './../../../../actions/user.action';
import { Router, ActivatedRoute } from '@angular/router';
import { State } from './../../../../reducers/index';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tr-user-followers',
  templateUrl: './user-followers.component.html',
  styleUrls: ['./user-followers.component.scss']
})
export class UserFollowersComponent implements OnInit {

  private subscription: Subscription;
  private userIndex: string;
  private followersList;

  constructor(private store: Store<State>, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.subscription = this.route.parent.params.subscribe(
      (params) => this.userIndex = params['id']
    )
    this.userService.getUserFollowers(this.userIndex)
      .subscribe(data => {
        console.log(data);
        this.followersList = data;
      })
    // this.store.dispatch(new LoadUserFollowersAction(this.userIndex));
  }

}
