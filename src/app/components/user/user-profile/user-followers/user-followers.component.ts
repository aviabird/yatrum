import { Observable } from 'rxjs/Observable';
import { UserProfile } from './../../../../models/user-profile';
import { UserService } from './../../../../services/user.service';
import { LoadUserFollowersAction } from './../../../../actions/user.action';
import { Router, ActivatedRoute } from '@angular/router';
import { State, getUserFollowers } from './../../../../reducers/index';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'tr-user-followers',
  templateUrl: './user-followers.component.html',
  styleUrls: ['./user-followers.component.scss']
})
export class UserFollowersComponent implements OnInit, OnDestroy{

  private subscription: Subscription;
  private userIndex: string;
  public followersList$: Observable<Array<UserProfile>>

  constructor(private store: Store<State>, private route: ActivatedRoute, private userService: UserService) { 
    this.followersList$ = this.store.select(getUserFollowers);
  }

  ngOnInit() {
    this.subscription = this.route.parent.params.subscribe(
      (params) => this.userIndex = params['id']
    )
    this.store.dispatch(new LoadUserFollowersAction(this.userIndex));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
