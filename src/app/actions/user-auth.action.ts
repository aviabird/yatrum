import { Action } from "@ngrx/store";


export const ActionTypes = {
    LOGIN:                "[User] Login",
    LOGIN_SUCCESS:        "[User] Login Success",
    SERVER_LOGIN:         "[User] Server Login",    
    SERVER_LOGIN_SUCCESS: "[User] Server Login Success",
    LOGOUT:               "[User] Logout",
    LOGOUT_SUCCESS:       "[User] Logout Success"
}

export class LoginAction implements Action {
    type = ActionTypes.LOGIN;
    constructor() {}
}
export class LoginSuccessAction implements Action {
    type = ActionTypes.LOGIN_SUCCESS;
    constructor(public payload: any) {}
}
export class ServerLoginAction implements Action {
    type = ActionTypes.SERVER_LOGIN;
    constructor() {}
}
export class ServerLoginSuccessAction implements Action {
    type = ActionTypes.SERVER_LOGIN_SUCCESS;
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
