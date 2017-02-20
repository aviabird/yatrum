import * as fromRoot from './../../../reducers/index';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Form, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastyService } from 'ng2-toasty';
import { UpdateLoginFormNotification } from '../../../actions/notification.action';
import { ServerLoginAction } from '../../../actions/user-auth.action';

@Component({
  selector: 'tr-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signInForm: FormGroup;
  authStatus$: Observable<boolean>;
  // formErrorMessage$: Observable<string>;

  constructor(private fb: FormBuilder,
              private store: Store<fromRoot.State>,
              private router: Router,
              private toastyService: ToastyService) {
    this.authStatus$ = this.store.select(fromRoot.getAuthStatus);
    this.store.select(fromRoot.getLoginFormMessage)
      .subscribe((errors) => {
        if (errors && errors.length) {
          this.toastyService.clearAll();
          this.toastyService.error({title: "Login Error", msg: "Invalid Credentials"});
        }
      });
    this.redirectIfUserLoggedIn();
  }

  ngOnInit() {
    this.initForm()
  }

  socialLogin(provider: string){
    let payload = { data: provider, socialLogin: true }
    this.store.dispatch(new ServerLoginAction(payload));        
  }


  onSubmit() {
    let values = this.signInForm.value;
    let payload = { data: values, socialLogin: false }
    console.log('user object', values);
    // First clear the login form message
    this.store.dispatch(new UpdateLoginFormNotification(''));
    this.store.dispatch(new ServerLoginAction(payload));
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
        if(data == true){ this.router.navigateByUrl("/dashboard") }
      }
    )
  }
}
