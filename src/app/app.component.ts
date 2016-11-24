import { Component, OnInit } from '@angular/core';
// import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Travel app';
  private auth$: any;
  constructor(private af: AngularFire) {
    this.auth$ = this.af.auth;
  }

  ngOnInit() {
    this.auth$.subscribe(
      data => {
        //  dispath action auth changed
        console.log('data', data);
      });
  }

  login() {
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    })
  }

  logout() {
    this.af.auth.logout();
  }
}
