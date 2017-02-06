import {observable} from 'mobx';
import auth from '../auth';
import Run from './run';

class ShowData {

	@observable id;
	@observable name;
	@observable startDate;
	@observable endDate;
	@observable postcode;
	@observable notes;
	@observable runs = [];
	@observable runsLoaded = false;

	constructor({id, name, startDate, endDate, postcode, notes}) {
		this.id = id;
		this.name = name;
		this.startDate = startDate;
		this.endDate = endDate;
		this.postcode = postcode;
		this.notes = notes;

		auth.get(`/shows/${this.id}/runs`)
			.then(res => res.data)
			.then(data => data.map(r => new Run(r)))
			.then(data => {
				if (data === null) {
					this.runs = [];
				} else {
					this.runs = data;
				}

				this.runsLoaded = true;

			});

	}

	orderRuns() {
		this.runs.sort((a,b) => {
			return a.order > b.order;
		});
	}

}

export default ShowData;
