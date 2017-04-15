import {observable, toJS, computed} from 'mobx';
import auth from '../auth';
import Run from './run';
import shows from 'store/shows';
import moment from 'moment';

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

	@observable runs = [];
	@observable runsLoaded = true;

	@computed get closingSoon(){
		const soonInDays = 7;

		if(!this.closingDate) return false;

		const diff = this.closingDate.diff(moment(), 'days');

		return (diff <= soonInDays && diff >= 0);
	}

	constructor({id, name, startDate, endDate, postcode, notes, closingDate, bookedIn, paid, bookingPlatform, hotelNeeded, hotelBooked, holidayNeeded, holidayBooked, runs = []}) {
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

		this.startDate = moment(startDate);
		this.endDate = moment(endDate);
		this.closingDate = moment(closingDate);

		this.runs = observable(runs.map(r => new Run(r)));

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
						this.id = show.data.id;
						shows.items.push(this);
						resolve(show);
					});
			}
		});
	}

	serialize(){
		return Object.assign({}, this, {runs: undefined});
	}

}

export default Show;
