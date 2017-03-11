import moment from 'moment';

class ItemStore {

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

}
export default ItemStore;
