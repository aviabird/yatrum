import { LoadUserTripsAction } from './../../../actions/trips.action';
import { ActivatedRoute } from '@angular/router';
import { State } from './../../../reducers/index';
import { Subscription } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tr-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  private subscription: Subscription;
  private userIndex: string;

  constructor(private store: Store<State>, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe(
      (params) => this.userIndex = params['id']
    )
    this.store.dispatch(new LoadUserTripsAction(this.userIndex));
  }

}
