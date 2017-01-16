import { InstagramIntegrationService } from './../services/instagram-integration.service';
import * as InstagramActions from './../actions/instagram.action';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';

@Injectable()
export class InstagramEffects {
	constructor(private action$: Actions, private instaService: InstagramIntegrationService) {}

	@Effect()
	Media$: Observable<Action> = this.action$
		.ofType(InstagramActions.ActionTypes.LOAD_MEDIA)
		.switchMap((action: Action) => this.instaService.getUserInstagramMedia())
		.map((data) => new InstagramActions.MediaLoadedAction(data)); 
}