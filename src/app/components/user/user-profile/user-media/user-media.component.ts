import { LoadUserPicturesAction } from './../../../../actions/user.action';
import { Response } from '@angular/http';
import { LoadMediaAction } from './../../../../actions/instagram.action';
import * as fromRoot from './../../../../reducers/index';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit,  OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'tr-user-media',
  templateUrl: './user-media.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./user-media.component.scss']
})
export class UserMediaComponent implements OnInit {
	instagramMedia$: Observable<string[]>;
  private subscription: Subscription;
  userPictures$: Observable<any>;
  userIndex: string;
  hideLoader$: Observable<boolean>;


  constructor(private store: Store<fromRoot.State>,
              private route: ActivatedRoute,) { 
    // this.hideLoader$ = this.tripService.loading.select(response => !response)
    this.userPictures$ = this.store.select(fromRoot.getUserPictures)
    this.instagramMedia$ = this.store.select(fromRoot.getInstagramMedia);
  }

  getUserInstagramMedia() {
		this.store.dispatch(new LoadMediaAction());
	}

  ngOnInit() {
    this.subscription = this.route.parent.params.subscribe(
      (params) => this.userIndex = params['id']
    )
    this.store.dispatch(new LoadUserPicturesAction(this.userIndex));
  }
}
