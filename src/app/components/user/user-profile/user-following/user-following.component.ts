import { LoadUserFollowingAction, FollowUserFollowingAction } from './../../../../actions/user.action';
import { getUserFollowing, State, getLoggedInUserId } from './../../../../reducers/index';
import { UserService } from './../../../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserProfile } from './../../../../models/user-profile';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'tr-user-following',
  templateUrl: './user-following.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./user-following.component.scss']
})
export class UserFollowingComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private userIndex: string;
  public followingList$: Observable<Array<UserProfile>>;
  public loggedUserId$: Observable<string>;

  constructor(private store: Store<State>, private route: ActivatedRoute, private userService: UserService) { 
    this.followingList$ = this.store.select(getUserFollowing);
    this.loggedUserId$ = this.store.select(getLoggedInUserId);
  }

  ngOnInit() {
    this.subscription = this.route.parent.params.subscribe(
      (params) => this.userIndex = params['id']
    )
    this.store.dispatch(new LoadUserFollowingAction(this.userIndex));
  }

  onToggleFollow(id) {
    this.store.dispatch(new FollowUserFollowingAction({followed_id: id,user_id: this.userIndex}));
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
