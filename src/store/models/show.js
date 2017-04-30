import {observable, toJS, computed} from 'mobx';
import auth from '../auth';
import Run from './run';
import shows from 'store/shows';
import moment from 'moment';
import {reduce} from 'lodash';

class Show {

	@observable id;
	@observable name;
	@observable startDate;
	@observable endDate;
	@observable postcode;
	@observable notes;
	@observable closingDate;
	@observable bookedIn;
	@observable paid;
	@observable bookingPlatform;
	@observable hotelNeeded;
	@observable hotelBooked;
	@observable holidayNeeded;
	@observable holidayBooked;
	@observable campingRequired;
	@observable campingBooked;
	@observable campingConfirmed;

	@observable runs = [];
	@observable runsLoaded = true;

	@computed get closingSoon() {
		const soonInDays = 7;

		if (!this.closingDate) return false;

		const diff = this.closingDate.diff(moment(), 'days');

		return (diff <= soonInDays && diff >= 0);
	}

	constructor({id, name, startDate, endDate, postcode, notes, closingDate, bookedIn, paid, bookingPlatform, hotelNeeded, hotelBooked, holidayNeeded, holidayBooked, runs = [], campingRequired, campingBooked, campingConfirmed}) {
		this.id = id;
		this.name = name;
		this.postcode = postcode;
		this.notes = notes;
		this.bookedIn = bookedIn;
		this.paid = paid;
		this.bookingPlatform = bookingPlatform;
		this.hotelNeeded = hotelNeeded;
		this.hotelBooked = hotelBooked;
		this.holidayNeeded = holidayNeeded;
		this.holidayBooked = holidayBooked;
		this.campingRequired = campingRequired;
		this.campingBooked = campingBooked;
		this.campingConfirmed = campingConfirmed;

		this.startDate = moment(startDate);
		this.endDate = moment(endDate);
		this.closingDate = moment(closingDate);

		this.runs = observable(runs.map(r => new Run(r)));

	}

	save() {
		return new Promise((resolve, reject) => {
			if (this.id) {
				auth.post(`/shows/${this.id}`, this.serialize())
					.then(res = resolve(this));
			} else {
				//create
				auth.post('/shows', this.serialize())
					.then(res => res.data)
					.then(show => {
						this.id = show.data.id;
						shows.items.push(this);
						resolve(show);
					});
			}
		});
	}

	serialize() {
		return Object.assign({}, this, {runs: undefined});
	}

	getRun(id) {
		return this.runs.filter(r => parseInt(r.id) === parseInt(id))[0];
	}

	splitRunsByDateAndDog() {
		let runs = this.runs.sort((a,b) => a.date.diff(b.date, 'days')).reduce((acc, r) => {
			const date = r.date.format('YYYY MMMM DD');

			if(Array.isArray(acc[date])) {
				acc[date].push(r);
			} else {
				acc[date] = [r];
			}

			return acc;

		}, {});

		//TODO: Can probably simplify this into a map
		Object.keys(runs)
			// .sort(this.sortRunsByClass)
			.forEach(d => {

				const byDog = runs[d]
					.sort((a,b) => a.dog.name < b.dog.name)
					.reduce((acc, r) => {
						if(Array.isArray(acc[r.dog.name])) {
							acc[r.dog.name].push(r);
						} else {
							acc[r.dog.name] = [r];
						}
						acc[r.dog.name] = acc[r.dog.name].sort((a, b) => a.classNumber - b.classNumber);
						return acc;
					},{});

				runs[d] = byDog;

			});


		return runs;
	}

	removeRun(id){
		let runIndex = null;

		this.runs.forEach((run, index) => {
			if(run.id === id) {
				runIndex = index;
			}
		});

		this.runs.splice(runIndex, 1);

	}

}

export default Show;
