import { Action } from "@ngrx/store";

export const ActionTypes = {
  LOGIN:                "[User] Login",
  LOGIN_SUCCESS:        "[User] Login Success",
  LOGOUT:               "[User] Logout",
  LOGOUT_SUCCESS:       "[User] Logout Success",
  SERVER_LOGIN:         "[User] Server Login",    
  SERVER_LOGIN_SUCCESS: "[User] Server Login Success",
  SERVER_LOGOUT:        "[User] Server Logout",  
  SERVER_LOGOUT_SUCCESS:"[User] Server Logout Success",
  SERVER_SIGNUP:        "[User] Server Signup",
  SERVER_SIGNUP_SUCCESS:"[User] Server Signup Success",
  USER_UPDATE_SUCCESS:  "[User] Update Success]",
  SELECTED_PROFILE_USER: "Selected Profile [User]",
  UNSELECT_PROFILE_USER: "UnSelect Profile [User]",
}

export class LoginAction implements Action {
  type = ActionTypes.LOGIN;
  constructor() {}
}
export class LoginSuccessAction implements Action {
  type = ActionTypes.LOGIN_SUCCESS;
  constructor(public payload: any) {}
}
export class LogoutAction implements Action {
  type = ActionTypes.LOGOUT;
  constructor() {}
}
export class LogoutSuccessAction implements Action {
  type = ActionTypes.LOGOUT_SUCCESS;
  constructor() {}
}
// Actions for Rails Api connection 
export class ServerLoginAction implements Action {
  type = ActionTypes.SERVER_LOGIN;
  constructor(public payload: any) {}
}
export class ServerLoginSuccessAction implements Action {
  type = ActionTypes.SERVER_LOGIN_SUCCESS;
  constructor(public payload: any) {}
}
export class ServerLogoutAction implements Action {
  type = ActionTypes.SERVER_LOGOUT;
  constructor() {}
}
export class ServerLogoutSuccessAction implements Action {
  type = ActionTypes.SERVER_LOGOUT_SUCCESS;
  constructor() {}
}
export class ServerSignUpAction implements Action {
  type = ActionTypes.SERVER_SIGNUP;
  constructor(public payload: any) {}
}
export class ServerSignUpSuccessAction implements Action {
  type = ActionTypes.SERVER_SIGNUP_SUCCESS;
  constructor() {}
}
export class UserUpdateSuccessAction implements Action {
  type = ActionTypes.USER_UPDATE_SUCCESS;
  constructor(public payload: any) {}
}
export class SelectedProfileUserAction implements Action {
  type = ActionTypes.SELECTED_PROFILE_USER;
  constructor(public payload: any) {}
}
export class UnSelectProfileUserAction implements Action {
  type = ActionTypes.UNSELECT_PROFILE_USER;
  constructor() {}
}