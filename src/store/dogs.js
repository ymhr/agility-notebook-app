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
			.then(res => res.data);
	}

	setDogs(data) {
		const dogs = data.map(d => new Dog(d));
		this.items = dogs;
		this.loaded = true;
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
