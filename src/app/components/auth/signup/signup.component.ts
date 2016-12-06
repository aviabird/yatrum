import { ServerAuthService } from './../../../services/server-auth.service';
import { ServerSignUpAction } from './../../../actions/user-auth.action';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as fromRoot from '../../../reducers';

@Component({
  selector: 'tr-signup',
  templateUrl: './signup.component.html',
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
    this.authStatus$ = this.store.let(fromRoot.getAuthStatus);
    this.formErrorMessage$ = this.store.let(fromRoot.getSignUpFormMessage)
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
      email: [email, Validators.required],
      password: [password, Validators.required],
      password_confirmation: [password_confirmation, Validators.required]
    })
  }

  onSubmit() {
    console.log('in on submit method', this.signUpForm.value);
    // this.store.dispatch(new ServerSignUpAction(this.signUpForm.value));
    this.authService.signUp({user: this.signUpForm.value}).subscribe(data => {
       this.router.navigateByUrl('/login');
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
