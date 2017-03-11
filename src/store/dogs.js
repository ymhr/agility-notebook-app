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

	async get(id) {

		try{
			const localRes = await this.getFromLocal(id);

			if(!localRes){
				const remoteRes = await this.getFromRemote(id);

				if(remoteRes)
					return remoteRes;
				else
					throw new Error('No dogs found with that ID');

			} else {
				return localRes;
			}

		} catch(err){
			console.error(err);
			throw new Error('No dogs were found');
		};

	}

	getFromLocal(id) {
		return new Promise((resolve, reject) => {
			const dog = this.items.filter(i => i.id === id)[0];
			resolve(dog);
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
				return this.items.filter(i => i.id == id)[0];
			});
	}

	update(id, data) {
		return auth.post(`/dogs/${id}`, data);
	}

}

const instance = new Dogs();

export default instance;
