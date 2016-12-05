
// Add actions as per your need 
export const ActionTypes = {
  UPDATE_LOGIN_NOTIFICATION: "[Notification] Login Form"
}

export class UpdateLoginFormNotification {
  type = ActionTypes.UPDATE_LOGIN_NOTIFICATION;
  constructor(public payload: string) { }
}