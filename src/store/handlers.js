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
			.then(data => data.map(d => new Handler(d)))
			.then(handlers => this.items = handlers)
			.then(handlers => {
				this.loaded = true;
				return handlers;
			});
	}

	createModelInstance(data){
		return new Handler(data);
	}

}

const instance = new Handlers();

export default instance;
