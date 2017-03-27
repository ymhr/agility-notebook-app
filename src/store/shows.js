import {observable} from 'mobx';
import moment from 'moment';
import Show from './models/show';
import auth from './auth';
import ItemStore from './base/itemStore';

class Shows extends ItemStore{

	itemClass = Show;
	endpoint = 'shows';

	@observable items = [];
	@observable loaded = false;

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
				})
				.catch(err => console.warn('load runs err', err));
		});

	};

	sortList(items) {
		//TODO: Secodary sort by ID
		return items.sort((a, b) => {
			const aDate = moment(a.startDate);
			const bDate = moment(b.startDate);

			return aDate.diff(bDate);
		});
	}

}

const instance = new Shows();

export default instance;
