import { UserProfile } from './../models/user-profile';
import { Action, Store } from '@ngrx/store';

export const ActionTypes = {
	LOAD_USER_FOLLOWERS: "Load [User] Followers",
	USER_FOLLOWERS_LOADED: "[User] Followeres Loaded",
	LOAD_USER_FOLLOWING: "Load [User] Following",
	USER_FOLLOWING_LOADED: "[User] Following Loaded",
	FOLLOW_USER: "Follow [User]",
	FOLLOW_PROFILE_USER: "Follow profile [User]",
	PROFILE_USER_FOLLOWED: "Profile [User] Followed",
	UPDATE_USER: "Update [User]",
	UPDATE_USER_SUCCESS: "Update [User] Success",
  LOAD_USER_PICTURES: "Load [User] Pictures",
  USER_PICTURES_LOADED: "[User] Pictues Loaded",
  LOAD_MORE_USER_PICTURES: "Load More [User] Pictures",
  MORE_USER_PICTURES_LOADED: "More [User] Pictues Loaded",	
	FOLLOW_USER_FOLLOWERS: "Follow [User] Profile Followers",
	FOLLOW_USER_FOLLOWING: "Follow [User] Profile Following",
	USER_FOLLOWERS_FOLLOWED: "[User] Followers Followed",
	USER_FOLLOWING_FOLLOWED: "[User] Following Followed",
}
export class LoadUserFollowersAction {
	type = ActionTypes.LOAD_USER_FOLLOWERS;
	constructor(public payload: string) { }
}

export class UserFollowersLoadedAction {
	type = ActionTypes.USER_FOLLOWERS_LOADED;
	constructor(public payload: any) { }
}

export class LoadUserFollowingAction {
	type = ActionTypes.LOAD_USER_FOLLOWING;
	constructor(public payload: string) { }
}

export class UserFollowingLoadedAction {
	type = ActionTypes.USER_FOLLOWING_LOADED;
	constructor(public payload: any) { }
}

export class FollowUserAction {
	type = ActionTypes.FOLLOW_USER;
	constructor(public payload: string) { }
}

export class FollowProfileUserAction {
	type = ActionTypes.FOLLOW_PROFILE_USER;
	constructor(public payload: string) { }
}

export class ProfileUserFollowed {
	type = ActionTypes.PROFILE_USER_FOLLOWED;
	constructor(public payload: any) { }

}

// Refactor this actions after the refactoring of User reducer

export class FollowUserFollowersAction {
	type = ActionTypes.FOLLOW_USER_FOLLOWERS;
	constructor(public payload: Object) {};	 
}

export class FollowUserFollowingAction {
	type = ActionTypes.FOLLOW_USER_FOLLOWING;
	constructor(public payload: Object) {};
}


/**
 * Author: VoidZero
 * 
 * Currently this action is used to update Social links in Settings page
 * However it should be used for updating any params related to user model (UserProfile).
 * Something like a common Action for updating columns in User model.
 * 
 * Further, it takes payload as any. plans are it should be user params 
 * in a dictonary format like below
 * => {user: {twitter_url, facebook_url, name, etc...}}
 * and sent it to user service and return updated User Model from the service call
 * more specifically from backend and update the Current user UserProfile
 * model in store using
 * action UpdateUserSuccess
 * 
 * TODO: Discuss and Implement above feature accordingly
 * 
 */
export class UpdateUser {
	type = ActionTypes.UPDATE_USER;
	constructor(public payload: any) { }
}

export class UpdateUserSuccess {
	type = ActionTypes.UPDATE_USER_SUCCESS;
	constructor(public payload: UserProfile) { }
}

export class LoadUserPicturesAction {
	type = ActionTypes.LOAD_USER_PICTURES;
	constructor(public payload: Object) { }
}

export class LoadMoreUserPicturesAction {
	type = ActionTypes.LOAD_MORE_USER_PICTURES;
	constructor(public payload: Object) { }
}

export class UserPicturesLoadedAction {
	type = ActionTypes.USER_PICTURES_LOADED;
	constructor(public payload: any) { }
}

export class MoreUserPicturesLoadedAction {
	type = ActionTypes.MORE_USER_PICTURES_LOADED;
	constructor(public payload: any) { }
}
