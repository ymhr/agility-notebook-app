import {observable, toJS} from 'mobx';
import auth from '../auth';
import Run from './run';
import runs from 'store/runs';
import shows from 'store/shows';

class Show {

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

	save(){
		return new Promise((resolve, reject) => {
			if(this.id){
					auth.post(`/shows/${this.id}`, this.serialize())
						.then(res = resolve(this));
			} else {
				//create
				auth.post('/shows', this.serialize())
					.then(res => res.data)
					.then(show => {
						this.id = show.id;
						shows.items.push(this);
						resolve(show);
					});
			}
		});
	}

	serialize(){
		return toJS(this);
	}

}

export default Show;
