import { ServerAuthService } from './../../../services/server-auth.service';
import * as fromRoot from './../../../reducers/index';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router } from '@angular/router';
import { passwordValidator } from '../../../shared/validators/password.validator';

@Component({
  selector: 'tr-signup',
  templateUrl: './signup.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  authStatus$: Observable<boolean>;
  formErrorMessage$: Observable<string>;

  constructor(private fb: FormBuilder,
              private router: Router,
              private store: Store<fromRoot.State>,
              private authService: ServerAuthService) {
    this.authStatus$ = this.store.select(fromRoot.getAuthStatus);
    this.formErrorMessage$ = this.store.select(fromRoot.getSignUpFormMessage)
    this.redirectIfUserLoggedIn()
  }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    let name = "";
    let email = "";
    let password = "";
    let password_confirmation = "";

    this.signUpForm = this.fb.group({
      name: [name, Validators.required],
      email: [email, [Validators.required ]],
      password: [password, Validators.required],
      password_confirmation: [password_confirmation, [Validators.required]]
    }, { validator: passwordValidator })
  }

  onSubmit() {
    this.authService.signUp({user: this.signUpForm.value}).subscribe(data => {
       this.router.navigateByUrl('/auth/login');
    }, error => {
      console.log('error registered is', error);
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
