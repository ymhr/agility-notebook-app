import moment from 'moment';
import auth from 'store/auth';

class ItemStore {

	itemClass;
	endpoint;

	addOrReplaceInList(items) {

		if(!Array.isArray(items)) items = [items];

		if (!this.items.length) {
			return items;
		}

		const itemIds = items.map(i => i.id);

		const filteredItems = this.items.filter((item) => {
			return !itemIds.includes(item.id);
		});

		return filteredItems.concat(items);

	}

	sortList(items) {
		return items.sort((a, b) => {
			const aDate = moment(a.startDate);
			const bDate = moment(b.startDate);

			return aDate.diff(bDate);
		});
	}

	async get(id) {

		let item;

		try{
			const localRes = await this.getFromLocal(id);

			if(!localRes){
				const remoteRes = await this.getFromRemote(id);

				if(remoteRes)
					item = new this.itemClass(remoteRes);
				else
					throw new Error(`No ${this.itemClass.name} found with that ID`, itemClass);

			} else {
				item = localRes;
			}

			this.items = this.sortList(this.addOrReplaceInList(item));

			return item;

		} catch(err){
			console.warn(err);
			throw new Error(`No ${this.itemClass.name} were found on local or remote`);
		};

	}

	getFromLocal(id) {
		return new Promise((resolve, reject) => {
			const item = this.items.filter(i => parseInt(i.id) === parseInt(id))[0];
			resolve(item);
		});
	}

	getFromRemote(id) {
		return auth.get(`/${this.endpoint}/${id}`)
			.then(res => res.data)
			.then(res => {
				if(res && res.id)
					return res;
				else
					throw new Error(`No ${this.itemClass.name} found on remote`);
			})
			.then(data => new this.itemClass(data))
			.then(item => this.addOrReplaceInList([item]))
			.then(items => this.sortList(items))
			.then(items => {
				this.items = items;
				return this.items.filter(i => i.id == id)[0];
			});
	}

	create(data) {
		return auth.post(`/${this.endpoint}`, data);
	}

	update(id, data) {
		return auth.post(`/${this.endpoint}/${id}`, data);
	}

}
export default ItemStore;
