import {observable, toJS, when} from 'mobx';
import auth from '../auth';
import app from '../app';
import dogs from '../dogs';
import handlers from '../handlers';

class Handler {

	@observable id;
	@observable userId;
	@observable name;
	@observable notes;

	@observable dogs = [];

	constructor({id, userId, name, notes}) {
		this.id = id;
		this.userId = userId;
		this.name = name;
		this.notes = notes;

		when(
			() => app.ready,
			() => this.loadDogs()
		)
	}

	loadDogs(){
		dogs.items.forEach(dog => {
			if(dog.handlerId === this.id){
				this.dogs.push(dog);
			}
		});
	}

	save(){
		return new Promise((resolve, reject) => {
			if(this.id){
				auth.post(`/handlers/${this.id}`, this.serialize())
					.then(res => resolve(this));
			} else {
				//create mode
				auth.post(`/handlers`, this.serialize())
					.then(res => res.data)
					.then(data => data.data)
					.then(handler => {
						this.id = handler.id;
						handlers.items.push(this);
						resolve(this.id);
					});
			}
		});
	}

	serialize(){
		return Object.assign({}, toJS(this), {dogs: undefined});
	}

}

export default Handler;
