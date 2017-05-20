import {observable, computed, toJS, when, action, reaction} from 'mobx';
import dogs from '../dogs';
import shows from '../shows';
import app from '../app';
import Dog from './dog';
import moment from 'moment';
import auth from '../auth';
import handlers from '../handlers';

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
	@observable handlerOverride;

	@observable handler;

	//Weather, surface type, indoor/outdoor?
	@observable loaded = false;
	@observable expanded = false;

	constructor(data) {
		this.id = data.id;
		this.showId = data.showId;
		this.order = data.order;
		this.grade = data.grade;
		this.notes = data.notes;
		this.place = data.place;
		this.faults = data.faults;
		this.runningOrder = data.runningOrder;
		this.ringNumber = data.ringNumber;
		this.dogId = data.dogId;
		this.classSize = data.classSize;
		this.judge = data.judge;
		this.type = data.type;
		this.gradeType = data.gradeType;
		this.classNumber = data.classNumber;
		this.courseTime = data.courseTime;
		this.runTime = data.runTime;
		this.courseLength = data.courseLength;
		this.currentGrade = data.currentGrade;
		this.date = data.date;
		this.specialType = data.specialType;
		this.clear = data.clear;
		this.eliminated = data.eliminated;
		this.winningTime = data.winningTime;
		this.handlerOverride = data.handlerOverride;

		if (data.date)
			this.date = moment(data.date);

		//Make sure that the shows are loaded before we try to get a ref to this runs show
		when(
			() => app.ready,
			() => this.load()
		);

		reaction(
			() => [this.handlerOverride, this.dog.handlerId],
			() => {
				if(this.handlerOverride && !(this.handlerOverride === this.dog.handlerId)) {
					this.handler = handlers.get(this.handlerOverride)
											.then(h => this.handler = h);
				} else {
					this.handlerOverride = null;
					this.handler = this.dog.handler;
				}
			}
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
			dog: undefined,
			handler: undefined
		});

		return serializableObject;
	}

}

export default Run;
