import {observable} from 'mobx';
import dogs from '../dogs';
import Dog from './dog';

class Run {

	@observable id;
	@observable showId;
	@observable order;
	@observable grade;
	@observable notes;
	@observable place;
	@observable dog = false;

	constructor({id, showId, order, grade, notes, place, dogId}){
		this.id = id;
		this.showId = showId;
		this.order = order;
		this.grade = grade;
		this.notes = notes;
		this.place = place;
		this.loadDog(dogId);
	}

	loadDog(id){
		dogs.get(id)
			.then(d => this.dog = new Dog(d));
	}

}

export default Run;
