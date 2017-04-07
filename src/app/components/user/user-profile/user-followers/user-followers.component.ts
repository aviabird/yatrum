import { Observable } from 'rxjs/Observable';
import { UserProfile } from './../../../../models/user-profile';
import { UserService } from './../../../../services/user.service';
import { LoadUserFollowersAction, FollowProfileUserAction, FollowUserFollowersAction } from './../../../../actions/user.action';
import { Router, ActivatedRoute } from '@angular/router';
import { State, getUserFollowers, getLoggedInUserId } from './../../../../reducers/index';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/subscription';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'tr-user-followers',
  templateUrl: './user-followers.component.html',
  styleUrls: ['./user-followers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFollowersComponent implements OnInit, OnDestroy{

  private subscription: Subscription;
  private userIndex: string;
  public followersList$: Observable<Array<UserProfile>>;
  public loggedUserId$: Observable<string>;

  constructor(private store: Store<State>, private route: ActivatedRoute, private userService: UserService) { 
    this.followersList$ = this.store.select(getUserFollowers);
    this.loggedUserId$ = this.store.select(getLoggedInUserId);
  }

  ngOnInit() {
    this.subscription = this.route.parent.params.subscribe(
      (params) => this.userIndex = params['id']
    )
    this.store.dispatch(new LoadUserFollowersAction(this.userIndex));
  }

  onToggleFollow(id) {
    this.store.dispatch(new FollowUserFollowersAction({followed_id: id,user_id: this.userIndex}));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
