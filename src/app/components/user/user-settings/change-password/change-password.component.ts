import { ToastyService } from 'ng2-toasty';
import { UserService } from './../../../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tr-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  public oldPassword: string;
  public password: string;
  public confirmPassword: string
  constructor(
    private userService: UserService,
    private toastyService: ToastyService) { }

  ngOnInit() {
  }

  // TODO: Should accept form data and valid it first at frontend
  changePassword(isValid: boolean){
    this.userService.changePassword(this.oldPassword, 
      this.password,
      this.confirmPassword
    ).subscribe(
      response => {
      this.toastyService.success({ title: "Success", msg: "You Successfully Updated your Password" });
      return;
    },
    err => {
      console.log("Inside Error")
      this.toastyService.warning({ title: "Error", msg: "Password Update Failed" });
      return;
      }
    );
  }
}
