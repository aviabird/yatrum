import { LoadUserFollowingAction } from './../../../../actions/user.action';
import { getUserFollowing, State } from './../../../../reducers/index';
import { UserService } from './../../../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserProfile } from './../../../../models/user-profile';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'tr-user-following',
  templateUrl: './user-following.component.html',
  styleUrls: ['./user-following.component.scss']
})
export class UserFollowingComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private userIndex: string;
  public followingList$: Observable<Array<UserProfile>>

  constructor(private store: Store<State>, private route: ActivatedRoute, private userService: UserService) { 
    this.followingList$ = this.store.select(getUserFollowing);
  }

  ngOnInit() {
    this.subscription = this.route.parent.params.subscribe(
      (params) => this.userIndex = params['id']
    )
    this.store.dispatch(new LoadUserFollowingAction(this.userIndex));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
