import {observable} from 'mobx';
import auth from './auth';
import ItemStore from './base/itemStore';

import Dog from './models/dog';
import Handler from './models/handler';
import Profile from './profile';

class Handlers extends ItemStore {

	itemClass = Handler;
	endpoint = 'handlers';

	@observable items = [];
	@observable loaded = false;

	load() {
		return auth.get('/handlers')
			.then(res => res.data)
	}

	setHandlers(data) {
		const handlers = data.map(d => new Handler(d));
		this.items = handlers;
		this.loaded = true;

	}

	createModelInstance(data){
		return new Handler(data);
	}

}

const instance = new Handlers();

export default instance;
