import {observable} from 'mobx';
import moment from 'moment';
import Show from './models/show';
import auth from './auth';
import ItemStore from './base/itemStore';

class Shows extends ItemStore{

	@observable items = [];
	loaded = false;

	load = () => {
		return new Promise((resolve, reject) => {

			if (this.loaded) {
				resolve(this.items);
				return;
			}

			auth.get('/shows')
				.then(res => res.data.map(i => new Show(i)))
				.then(items => this.addOrReplaceInList(items))
				.then(items => this.sortList(items))
				.then(items => this.items = items)
				.then(items => {
					this.loaded = true;
					resolve(this.items);
				});
		});

	};

	get(showId) {
		return auth.get(`/shows/${showId}`)
			.then(res => res.data)
			.then(item => new Show(item))
			.then(item => this.addOrReplaceInList([item]))
			.then(items => this.sortList(items))
			.then(items => {
				this.items = items;
				return this.items.filter(i => i.id === showId)[0]
			});
	}

	create(data) {
		return auth.post('/shows', data);
	}

	update(id, data) {
		return auth.post(`/shows/${id}`, data);
	}

	itemsContains(id) {
		return (this.items.filter(item => item.id === id));
	}

}

const instance = new Shows();

export default instance;
