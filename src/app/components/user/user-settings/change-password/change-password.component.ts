import { UserService } from './../../../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tr-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  private oldPassword: string;
  private password: string;
  private confirmPassword: string
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  // TODO: Should accept form data and valid it first at frontend
  changePassword(isValid: boolean){
    this.userService.changePassword(this.oldPassword, 
      this.password,
      this.confirmPassword
    ).subscribe(response => {
      console.log(response);
    });
  }

}
