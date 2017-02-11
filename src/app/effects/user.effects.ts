import { UserService } from './../services/user.service';
import * as UserActions from './../actions/user.action';
import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import * as TripsActions from './../actions/trips.action';

@Injectable()

export class UserEffects {
	constructor(private action$: Actions, private userService: UserService) {}

	@Effect()
		UserFollowers$: Observable<Action> = this.action$
			.ofType(UserActions.ActionTypes.LOAD_USER_FOLLOWERS)
			.switchMap((action: Action) => this.userService.getUserFollowers(action.payload))
			.map((data) => new UserActions.UserFollowersLoadedAction(data));

	@Effect()
		UserFollowing$: Observable<Action> = this.action$
			.ofType(UserActions.ActionTypes.LOAD_USER_FOLLOWING)
			.switchMap((action: Action) => this.userService.getUserFollowing(action.payload))
			.map((data) => new UserActions.UserFollowingLoadedAction(data));
	
	@Effect()
		FollowUser$: Observable<Action> = this.action$
			.ofType(UserActions.ActionTypes.FOLLOW_USER)
			.switchMap((action: Action) => this.userService.addTravellerToFollowingList(action.payload))
			.map((data) => {
				return new TripsActions.TripUserFollowedAction(data)
			});

}