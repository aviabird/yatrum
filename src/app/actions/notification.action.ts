
// Add actions as per your need 
export const ActionTypes = {
  UPDATE_LOGIN_NOTIFICATION: "[Notification] Login Form",
  UPDATE_SIGNUP_NOTIFICATION: "[Notification] Signup Form"
}

export class UpdateLoginFormNotification {
  type = ActionTypes.UPDATE_LOGIN_NOTIFICATION;
  constructor(public payload: string) { }
}
export class UpdateSingUpFormNotification {
  type = ActionTypes.UPDATE_SIGNUP_NOTIFICATION;
  constructor(public payload: string) { }
}