import {observable, toJS} from 'mobx';
import auth from '../auth';

class Dog {

	id;
	userId;
	@observable name;
	@observable grade;
	@observable notes;
	@observable officialName;

	constructor({id, userId, name, grade, notes, officialName, height}) {
		this.id = id;
		this.userId = userId;
		this.name = name;
		this.grade = grade;
		this.notes = notes;
		this.officialName = officialName;
		this.height = height;
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
		});
	}

	serialize(){
		return toJS(this);
	}

}

export default Dog;
