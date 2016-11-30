import { ServerLoginAction, LoginAction } from './../../../actions/user-auth.action';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import { Form, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'tr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signInForm: FormGroup;

  constructor(private fb: FormBuilder,
              private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.initForm()
  }

  onSubmit() {
    let values = this.signInForm.value;
    console.log('user object', values);
    this.store.dispatch(new ServerLoginAction(values));
  }

  initForm() {
    let email: '';
    let password: '';

    this.signInForm = this.fb.group({
      'email': [email, Validators.required],
      'password': [password, Validators.required]
    });
  }

}
