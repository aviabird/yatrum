import { UpdateLoginFormNotification } from './../../../actions/notification.action';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ServerLoginAction, LoginAction } from './../../../actions/user-auth.action';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import { Form, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'tr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signInForm: FormGroup;
  authStatus$: Observable<boolean>;
  formErrorMessage$: Observable<string>;

  constructor(private fb: FormBuilder,
              private store: Store<fromRoot.State>,
              private router: Router) {
    this.authStatus$ = this.store.let(fromRoot.getAuthStatus);
    this.formErrorMessage$ = this.store.let(fromRoot.getLoginFormMessage)
    this.redirectIfUserLoggedIn()
  }

  ngOnInit() {
    this.initForm()
  }

  onSubmit() {
    let values = this.signInForm.value;
    console.log('user object', values);
    // First clear the login form message
    this.store.dispatch(new UpdateLoginFormNotification(''));
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

  redirectIfUserLoggedIn() {
    this.authStatus$.subscribe(
      data => { 
        if(data == true){ this.router.navigateByUrl("/trips") }
      }
    )
  }
}
