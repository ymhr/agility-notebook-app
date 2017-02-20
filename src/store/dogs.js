import {observable} from 'mobx';
import auth from './auth';
import ItemStore from './base/itemStore';

import Dog from './models/dog';

class Dogs extends ItemStore {

	@observable items = [];

	load() {
		return auth.get('/dogs')
			.then(res => res.data)
			.then(data => data.map(d => new Dog(d)))
			.then(dogs => this.items = dogs);
	}

	get(id) {
		return this.getFromLocal(id)
			.then(res => {
				return res;
			})
			.catch(err => {
				return this.getFromRemote(id);
			});

	}

	getFromLocal(id) {
		return new Promise((resolve, reject) => {
			const dog = this.items.filter(i => i.id === id)[0];
			if(dog){
				resolve(dog);
			} else {
				reject('No dog found');
			}
		});
	}

	getFromRemote(id) {
		return auth.get(`/dogs/${id}`)
			.then(res => res.data)
			.then(data => new Dog(data))
			.then(item => this.addOrReplaceInList([item]))
			.then(items => this.sortList(items))
			.then(items => {
				this.items = items;
				return this.items.filter(i => i.id === id)[0]
			});
	}

}

const instance = new Dogs();

export default instance;
