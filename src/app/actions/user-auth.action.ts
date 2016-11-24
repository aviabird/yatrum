import { Action } from "@ngrx/store";


export const ActionTypes = {
    LOGIN:          "[User] Login",
    LOGIN_SUCCESS:  "[User] Login Success",
    LOGOUT:         "[User] Logout",
    LOGOUT_SUCCESS: "[User] Logout Success"

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
