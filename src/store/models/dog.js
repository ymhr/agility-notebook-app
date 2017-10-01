import {observable, toJS, when} from 'mobx';
import auth from '../auth';
import app from '../app';
import handlers from '../handlers';
import moment from 'moment';

class Dog {

	@observable id;
	@observable userId;
	@observable name;
	@observable grade;
	@observable notes;
	@observable officialName;
	@observable handlerId;
	@observable lowerHeight;
	@observable notForCompetition;
	@observable registeredNumber;
	@observable meta;
	@observable breed;
	@observable sex;
	@observable dateOfBirth;
	@observable metaObject;

	constructor({id, userId, name, grade, notes, officialName, height, handlerId, lowerHeight, notForCompetition, registeredNumber, meta, breed, sex, dateOfBirth}) {
		this.id = id;
		this.userId = userId;
		this.name = name;
		this.grade = grade;
		this.notes = notes;
		this.officialName = officialName;
		this.height = height;
		this.handlerId = handlerId;
		this.lowerHeight = lowerHeight;
		this.notForCompetition = notForCompetition;
		this.registeredNumber = registeredNumber;
		this.meta = meta;
		this.breed = breed;
		this.sex = sex;
		this.dateOfBirth = dateOfBirth;

		if(this.dateOfBirth)
			this.dateOfBirth = moment(this.dateOfBirth);

		if(typeof this.meta === 'object')
			this.metaObject = JSON.parse(this.meta);


		this.loadHandler();

	}
	
	loadHandler(){
		if(!this.handlerId) return;
		this.handler = handlers.items.filter(h => h.id === this.handlerId)[0] || null;
	}

	save(){
		return new Promise((resolve, reject) => {
			if(this.id){
				auth.post(`/dogs/${this.id}`, this.serialize())
					.then(res => resolve(this));
			} else {
				//create mode
				auth.post(`/dogs`, this.serialize())
					.then(res => res.data)
					.then(data => data.data)
					.then(dog => {
						this.id = dog.id;
						resolve(this.id);
					});
			}

			this.loadHandler();
		});
	}

	serialize(){
		return Object.assign({}, toJS(this), {handler: undefined, metaObject: undefined});
	}

}

export default Dog;
