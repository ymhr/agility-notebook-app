import {observable} from 'mobx';
import auth from '../auth';
import Run from './run';
import runs from 'store/runs';

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

		this.loadRuns()
			.then(runs => {
				this.runsLoaded = true;
			});
		// console.trace('test');

		// auth.get(`/shows/${this.id}/runs`)
		// 	.then(res => res.data)
		// 	.then(data => data.map(r => new Run(r)))
		// 	.then(runs => this.orderRuns(runs))
		// 	.then(data => {
		// 		if (data === null) {
		// 			this.runs = [];
		// 		} else {
		// 			this.runs = data;
		// 		}
		//
		// 		this.runsLoaded = true;
		//
		// 	});

	}

	orderRuns(runs) {
		return runs.sort((a,b) => {
			return a.order > b.order;
		});
	}

	loadRuns(){
		return runs.getForShow(this.id)
			.then(runs => this.orderRuns(runs))
			.then(runs => this.runs = runs)
			.then(runs => {
				this.runsLoaded = true;
				return runs;
			})
			.catch((err) =>{
				console.warn(err)
			});
	}

}

export default ShowData;
