import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../../reducers/index';
import { DeleteCommentAction } from '../../../../actions/comment.action';
import { UserProfile } from '../../../../models/user-profile';
import { Comment } from '../../../../models/comment';

@Component({
  selector: 'tr-trip-comment',
  templateUrl: './trip-comment.component.html',
  styleUrls: ['./trip-comment.component.scss'],
  inputs: ["comment", "authUser"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripCommentComponent implements OnInit {
  comment: Comment;
  authUser: UserProfile;

  constructor(
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit() {
  }

  onCommentDelete(id) {
    this.store.dispatch(new DeleteCommentAction(this.comment))
  }

}
