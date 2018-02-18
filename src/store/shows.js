import {observable} from 'mobx';
import moment from 'moment';
import uniq from 'lodash/uniq';
import Show from './models/show';
import auth from './auth';
import ItemStore from './base/itemStore';

class Shows extends ItemStore{

	itemClass = Show;
	endpoint = 'shows';

	@observable items = [];
	@observable loaded = false;
	@observable availableYears = [];
	@observable yearFilter = moment().format('Y');

	load = () => {
		return auth.get('/shows')
			.then(res => res.data)
			.catch(err => console.warn('load runs err', err));
	};

	getShows = () => {
		const shows = this.items;
		
		if(this.yearFilter){
			return shows.filter(s =>{
				return parseInt(s.endDate.format('Y')) === parseInt(this.yearFilter)
			});
		}

		return shows;
	};

	setShows(data) {
		let shows = data.map(d => new Show(d));
		shows = this.addOrReplaceInList(shows);
		shows = this.sortList(shows);
		this.items = shows;
		//We have to set the runs after we have set the shows, otherwise it makes a new request for the show for every run it creates
		shows.forEach(s => s.setRuns());	
		shows.forEach(s => this.availableYears.push(moment(s.endDate).format('Y')));	
		
		this.availableYears = uniq(this.availableYears)
								.sort((a, b) => a > b);

		this.loaded = true;
	}

	sortList(items) {
		//TODO: Secodary sort by ID
		return items.sort((a, b) => {
			const aDate = moment(a.startDate);
			const bDate = moment(b.startDate);

			return aDate.diff(bDate);
		});
	}

	delete(id){
		return auth.post(`/shows/${id}/delete`)
			.then(() => {
				let showIndex = null;
				this.items.forEach((show, index) => {
					if(show.id === id)
						showIndex = index;
				});

				this.items.splice(showIndex, 1);

				this.props.history.push('/shows');

			});
	}

}

const instance = new Shows();

export default instance;
