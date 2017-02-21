import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers/index';
import { UnSelectProfileUserAction } from '../../actions/user-auth.action';

@Component({
  selector: 'tr-user',
  templateUrl: './user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    document.body.scrollTop = 0;
  }

  ngOnDestroy() {
    this.store.dispatch(new UnSelectProfileUserAction());
  }

}
