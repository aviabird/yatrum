import { ActionTypes } from './../actions/instagram.action';
import { Action } from '@ngrx/store';

export interface State {
	media: string[]
}

const initialState = {
	media: []
}

export function reducer(state = initialState, action: Action): State {
	switch(action.type) {
		case ActionTypes.LOAD_MEDIA_SUCCESS: {
			const media = action.payload["instagram_media"];
			console.log("payload full", action.payload);
			console.log("payload", media);
			return Object.assign({}, state, {media: media})		
		}
		
		default: {
			return state;
		}
	}
}

export function getInstagramMedia(state: State): string[] {
	return state.media;
}