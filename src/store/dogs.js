import {observable} from 'mobx';
import auth from './auth';
import ItemStore from './base/itemStore';

import Dog from './models/dog';

class Dogs extends ItemStore {

	itemClass = Dog;
	endpoint = 'dogs'

	@observable items = [];
	@observable loaded = false;

	load() {
		return auth.get('/dogs')
			.then(res => res.data)
			.then(data => data.map(d => new Dog(d)))
			.then(dogs => this.items = dogs)
			.then(() => this.loaded = true);
	}

	update(id, data) {
		return auth.post(`/dogs/${id}`, data);
	}

	create(data){
		return auth.post(`/dogs`, data);
	}

}

const instance = new Dogs();

export default instance;
