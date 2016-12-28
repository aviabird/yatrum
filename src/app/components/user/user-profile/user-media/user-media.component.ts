import { LoadMediaAction } from './../../../../actions/instagram.action';
import * as fromRoot from './../../../../reducers/index';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tr-user-media',
  templateUrl: './user-media.component.html',
  styleUrls: ['./user-media.component.scss']
})
export class UserMediaComponent implements OnInit {
	instagramMedia$: Observable<string[]>;

  constructor(private store: Store<fromRoot.State>) { 
    this.instagramMedia$ = this.store.select(fromRoot.getInstagramMedia);
  }

  getUserInstagramMedia() {
		this.store.dispatch(new LoadMediaAction());
	}

  ngOnInit() {
  }

}
