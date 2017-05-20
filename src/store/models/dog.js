import {observable, toJS, when} from 'mobx';
import auth from '../auth';
import app from '../app';
import handlers from '../handlers';

class Dog {

	@observable id;
	@observable userId;
	@observable name;
	@observable grade;
	@observable notes;
	@observable officialName;
	@observable handlerId;

	constructor({id, userId, name, grade, notes, officialName, height, handlerId}) {
		this.id = id;
		this.userId = userId;
		this.name = name;
		this.grade = grade;
		this.notes = notes;
		this.officialName = officialName;
		this.height = height;
		this.handlerId = handlerId;

		this.handler = null;

		when(
			() => app.ready,
			() => this.loadHandler()
		);
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
		return Object.assign({}, toJS(this), {handler: undefined});
	}

}

export default Dog;
