import { UserService } from './../services/user.service';
import { ServerAuthService } from './../services/server-auth.service';
import * as UserActions from './../actions/user.action';
import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import * as TripsActions from './../actions/trips.action';

@Injectable()

export class UserEffects {
	constructor(private action$: Actions, 
              private userService: UserService,
              private serverAuthService: ServerAuthService) {}

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
			.map((data) => new TripsActions.TripUserFollowedAction(data));
			
	@Effect()
		FollowProfileUser$: Observable<Action> = this.action$
		.ofType(UserActions.ActionTypes.FOLLOW_PROFILE_USER)
		.switchMap((action: Action) => this.userService.addTravellerToFollowingList(action.payload))
		.map((data) => new UserActions.ProfileUserFollowed(data));


  @Effect()
    UpdateUser$: Observable<Action> = this.action$
      .ofType(UserActions.ActionTypes.UPDATE_USER)
      .switchMap((action: Action) => this.userService.updateSocialLinks(action.payload))
      .map((data) => {
        let userProfile = this.serverAuthService.getServerUserProfile(data);
        console.log("userProfile is ", userProfile);
        return new UserActions.UpdateUserSuccess(userProfile);
      })

	@Effect()
		UserPictures$: Observable<Action> = this.action$
			.ofType(UserActions.ActionTypes.LOAD_USER_PICTURES)
			.switchMap((action: Action) => this.userService.getUserPictures(action.payload))
			.map((data) => new UserActions.UserPicturesLoadedAction(data));

	@Effect()
		MoreUserPictures$: Observable<Action> = this.action$
			.ofType(UserActions.ActionTypes.LOAD_MORE_USER_PICTURES)
			.switchMap((action: Action) => this.userService.getUserPictures(action.payload))
			.map((data) => new UserActions.MoreUserPicturesLoadedAction(data));


	@Effect()
		FollowUserFollowers$: Observable<Action> = this.action$
		.ofType(UserActions.ActionTypes.FOLLOW_USER_FOLLOWERS)
		.switchMap((action: Action) => this.userService.updateUserFollowers(action.payload))
		.map((data) => new UserActions.UserFollowersLoadedAction(data));

	@Effect()
		FollowUserFollowing$: Observable<Action> = this.action$
		.ofType(UserActions.ActionTypes.FOLLOW_USER_FOLLOWING)
		.switchMap((action: Action) => this.userService.updateUserFollowing(action.payload))
		.map((data) => new UserActions.UserFollowingLoadedAction(data));


}