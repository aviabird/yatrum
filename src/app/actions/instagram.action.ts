export const ActionTypes = {
	LOAD_MEDIA: "Load [Instagram Media]",
	LOAD_MEDIA_SUCCESS: "Load [Instagram Media] Success"
}

export class LoadMediaAction {
	type: string = ActionTypes.LOAD_MEDIA;
	constructor() {}
}

export class MediaLoadedAction {
	type: string = ActionTypes.LOAD_MEDIA_SUCCESS;
	constructor(public payload: {}) {}
}