import {observable, computed} from 'mobx';
import dogs from '../dogs';
import shows from '../shows';
import Dog from './dog';
import moment from 'moment';

class Run {

	@observable id;
	@observable showId;
	@observable order;
	@observable grade;
	@observable notes;
	@observable place;
	@observable faults;
	@observable dog = false;
	@observable show = false;
	@observable runningOrder;
	@observable ringNumber;
	@observable dogId;
	@observable loaded = false;

	@computed get clear(){
		if(!(this.faults || this.faults >= 0)){
			console.log('faults', this.faults);
			const showStartDate = moment(this.show.startDate);
			const diff = moment().diff(showStartDate, 'day');
			if(this.diff > 0){
				return true;
			}
		}

		return false;
	}

	constructor({id, showId, order, grade, notes, place, dogId, faults, runningOrder, ringNumber}){
		this.id = id;
		this.showId = showId;
		this.order = order;
		this.grade = grade;
		this.notes = notes;
		this.place = place;
		this.faults = faults;
		this.runningOrder = runningOrder;
		this.ringNumber = ringNumber;
		this.dogId = dogId;

		if(this.id){
			let loadedArray = [
				this.loadDog(),
				this.loadShow()
			];

			Promise.all(loadedArray).then((values) => {
				this.loaded = true;
			})
		}
	}

	loadDog(){
		return new Promise((resolve, reject) => {

			if(this.dog){
				resolve(this.dog);
				return;
			}

			dogs.get(this.dogId)
				.then(d => this.dog = d)
				.then(() => resolve(this.dog))
				.catch(err => console.warn(err));

		});
	}

	loadShow(){
		return new Promise((resolve, reject) => {
			if(this.show) {
				resolve(this.show);
				return;
			}

			shows.get(this.showId)
				.then(s => this.show = s)
				.then(() => resolve(this.show));
		});
	}

}

export default Run;
