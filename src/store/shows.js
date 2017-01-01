import {observable} from 'mobx';
import moment from 'moment';
import Show from './show';
import auth from './auth';

class Shows {

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
				.then(items => this.items = items);
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

	addOrReplaceInList(items) {

		if (!this.items.length) {
			return items;
		}

		const itemIds = items.map(i => i.id);

		const filteredItems = this.items.filter((item) => {
			return !itemIds.includes(item.id);
		});

		return filteredItems.concat(items);

	}

	create(data) {
		return auth.post('/shows', data);
	}

	update(id, data) {
		return auth.post(`/shows/${id}`, data);
	}

	sortList(items) {
		return items.sort((a, b) => {
			const aDate = moment(a.startDate);
			const bDate = moment(b.startDate);

			return aDate.diff(bDate);
		});
	}

	itemsContains(id) {
		return (this.items.filter(item => item.id = id));
	}

}

const instance = new Shows();

export default instance;
