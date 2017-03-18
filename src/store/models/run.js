import {observable, computed, toJS} from 'mobx';
import dogs from '../dogs';
import shows from '../shows';
import Dog from './dog';
import moment from 'moment';
import auth from '../auth';

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
	@observable classSize;
	@observable judge;
	@observable type; //Agility, jumping or special
	@observable graded; //true = graded, false = combined
	@observable classNumber;
	@observable courseTime;
	@observable runTime; //my time
	@observable courseLength;
	@observable currentGrade;
	//Weather, surface type, indoor/outdoor?
	@observable loaded = false;

	@computed get clear(){
		if(!(this.faults || this.faults == 0)){
			console.log('faults', this.faults);
			const showStartDate = moment(this.show.startDate);
			const diff = moment().diff(showStartDate, 'day');
			if(this.diff > 0){
				return 'clear';
			} else {
				return 'Not run';
			}
		}

		return 'faults';
	}

	constructor({id, showId, order, grade, notes, place, dogId, faults, runningOrder, ringNumber, classSize, judge, type, gradeType, classNumber, courseTime, runTime, courseLength, currentGrade}){
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
		this.classSize = classSize;
		this.judge = judge;
		this.type = type;
		this.gradeType = gradeType;
		this.classNumber = classNumber;
		this.courseTime = courseTime;
		this.runTime = runTime;
		this.courseLength = courseLength;
		this.currentGrade = currentGrade;

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

	save(){
		return new Promise((resolve, reject) => {
			if(this.id){
				//update mode
			} else {
				//create mode
				auth.post(`/shows/${this.showId}/runs`, this.serialize())
					.then(res => res.data)
					.then(data => data.data)
					.then(run => {
						this.id = run.id;
						resolve(this.id);
					});
			}
		});
	}

	serialize(){
		return toJS(this);
	}

}

export default Run;
