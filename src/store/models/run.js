import {observable, computed} from 'mobx';
import dogs from '../dogs';
import shows from '../shows';
import Dog from './dog';

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
		if(!(this.faults || this.faults < 0)){
			console.log(this.show.startDate);
			if(this.show && this.show.starteDate){}
		}
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

		let loadedArray = [
			this.loadDog(),
			this.loadShow()
		];

		Promise.all(loadedArray, values => {
			this.loaded = true;
		})


	}

	loadDog(){
		return new Promise((resolve, reject) => {
			if(this.dog) resolve(this.dog); return;

			dogs.get(this.dogId)
				.then(d => this.dog = d)
				.then(() => resolve(this.dog));

		});
		// return dogs.get(id)
		// 	.then(d => this.dog = new Dog(d))
		// 	.catch(err => {
		// 		console.log('nothing to do here');
		// 	});
	}

	loadShow(){
		return new Promise((resolve, reject) => {
			if(this.show) resolve(this.show); return;

			shows.get(this.showId)
				.then(s => this.show = s)
				.then(() => resolve(this.show));

		});
	}

}

export default Run;
