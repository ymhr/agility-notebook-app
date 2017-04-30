import {observable, computed, toJS, when, action} from 'mobx';
import dogs from '../dogs';
import shows from '../shows';
import Dog from './dog';
import moment from 'moment';
import auth from '../auth';
import runs from '../runs';

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
	@observable date;
	@observable specialType;
	@observable clear;
	@observable eliminated;
	@observable winningTime;
	//Weather, surface type, indoor/outdoor?
	@observable loaded = false;
	@observable expanded = false;

	// @computed get clear() {
	// 	if (!(this.faults || this.faults == 0)) {
	// 		console.log('faults', this.faults);
	// 		const showStartDate = moment(this.show.startDate);
	// 		const diff = moment().diff(showStartDate, 'day');
	// 		if (diff > 0) {
	// 			return 'clear';
	// 		} else {
	// 			return 'Not run';
	// 		}
	// 	}
	//
	// 	return 'faults';
	// }

	constructor({id, showId, order, grade, notes, place, dogId, faults, runningOrder, ringNumber, classSize, judge, type, gradeType, classNumber, courseTime, runTime, courseLength, currentGrade, date, specialType, winningTime, clear, eliminated}) {
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
		this.date = date;
		this.specialType = specialType;
		this.clear = clear;
		this.eliminated = eliminated;
		this.winningTime = winningTime;

		if (date)
			this.date = moment(date);
		// else
		// 	this.date = moment();

		//Make sure that the shows are loaded before we try to get a ref to this runs show
		when(
			() => shows.loaded,
			() => this.load()
		);

	}

	load() {
		const dataToLoad = [
			this.loadShow(),
			this.loadDog()
		];

		Promise.all(dataToLoad).then((values) => {
			this.markLoaded();

			if (!this.date)
				this.date = this.show.startDate;
		})
	}

	@action
	markLoaded(){
		this.loaded = true;
	}

	@action
	expandToggle() {
		this.expanded = !this.expanded;
	}

	loadDog(forceReload) {
		return new Promise((resolve, reject) => {
			if (this.dog && !forceReload) {
				resolve(this.dog);
				return;
			}

			dogs.get(this.dogId)
				.then(d => this.dog = d)
				.then(() => resolve(this.dog))
				.catch(err => console.warn(err));

		});
	}

	loadShow() {
		return new Promise((resolve, reject) => {
			if (this.show) {
				resolve(this.show);
				return;
			}

			shows.get(this.showId)
				.then(s => {
					this.show = s;

					if(!this.date)
						this.date = moment(this.show.startDate);

				})
				.then(() => resolve(this.show));
		});
	}

	save() {
		return new Promise((resolve, reject) => {
			if (this.id) {
				auth.post(`/shows/${this.showId}/runs/${this.id}`, this.serialize())
					.then(res => {
						this.loadDog(true).then(() => console.log('loaded new dog', this.dog, this.dogId));
						resolve(res);
					})
					.catch(err => {
						console.warn(err);
						reject(err);
					})
			} else {
				//create mode
				auth.post(`/shows/${this.showId}/runs`, this.serialize())
					.then(res => res.data)
					.then(data => data.data)
					.then(run => {
						this.id = run.id;
						// runs.addRunToShowList(this)
						this.show.runs.push(this);
						this.load();
						resolve(this.id);
					});
			}
		});
	}

	delete(){
		const id = this.id;
		return new Promise((resolve, reject) => {
			auth.post(`/shows/${this.showId}/runs/${id}/delete`)
				.then(() => {
					this.show.removeRun(id);
					resolve();
				});
		});
	}

	serialize() {
		const serializableObject = Object.assign({}, toJS(this), {
			show: undefined,
			dog: undefined
		});

		return serializableObject;
	}

}

export default Run;
