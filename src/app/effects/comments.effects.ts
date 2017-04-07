import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import * as commentAction from '../actions/comment.action';
import { State } from '../reducers/index';
import { Comment } from '../models/comment';
import { TripsService } from '../services/trips.service';

@Injectable()
export class CommentEffects {
  constructor(
    private actions$: Actions,
    private tripService: TripsService,
    private store: Store<State>
  ) {}

  @Effect() loadComments$: Observable<Action> = this.actions$
    .ofType(commentAction.ActionTypes.LOAD_COMMENTS)
    .map(action => action.payload)
    .switchMap<string, Comment[]>((trip_id) => this.tripService.getComments(trip_id))
    .filter((comments: Comment[]) => comments.length > 0)
    .map((comments) => new commentAction.LoadCommentsSuccessAction(comments))

  @Effect() addComment$: Observable<Action> = this.actions$
    .ofType(commentAction.ActionTypes.ADD_COMMENT)
    .map(action => action.payload)
    .switchMap<Comment, Comment>((comment: Comment) => this.tripService.addComment(comment))
    .map((comment) => new commentAction.AddCommentSuccessAction(comment))

  @Effect() deleteComment$: Observable<Action> = this.actions$
    .ofType(commentAction.ActionTypes.DELETE_COMMENT)
    .map(action => action.payload)
    .switchMap<Comment, Comment>((comment: Comment) => this.tripService.deleteComment(comment))
    .map((comment) => new commentAction.DeleteCommentSuccessAction(comment.id))
}