import { UserService } from './../../../../services/user.service';
import { LoadUserPicturesAction, LoadMoreUserPicturesAction } from './../../../../actions/user.action';
import { Response } from '@angular/http';
import { LoadMediaAction } from './../../../../actions/instagram.action';
import * as fromRoot from './../../../../reducers/index';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit,  OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

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
  current_page = 1;

  constructor(private store: Store<fromRoot.State>,
              private route: ActivatedRoute,
              private userService: UserService) { 
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
    this.store.dispatch(new LoadUserPicturesAction({user_id: this.userIndex, page: 1}));
  }

  onScroll() {
    this.current_page++;
    let total_pages = this.userService.total_pictures_pages;
    if(this.current_page <= total_pages)
      this.store.dispatch(new LoadMoreUserPicturesAction({user_id: this.userIndex, page: this.current_page}));
  }

}
