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
	@observable runningOrder;
	@observable ringNumber;
	@observable dogId;

	@computed get clear(){
		if(!(this.faults || this.faults < 0)){
			console.log(this.show.startDate);
			if(this.show && this.show.starteDate){}
		}
	}

	@computed get show(){
		//Get the show from the shows store, hopefully can use this in the 'clear' computed value
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
		this.loadDog(dogId);
	}

	loadDog(id){
		dogs.get(id)
			.then(d => this.dog = new Dog(d))
			.catch(err => {
				console.log('nothing to do here');
			});
	}

}

export default Run;
