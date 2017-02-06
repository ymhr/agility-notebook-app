import {observable} from 'mobx';

class Dog {

	id;
	userId;
	@observable name;
	@observable grade;
	@observable notes;

	constructor({id, userId, name, grade, notes}) {
		this.id = id;
		this.userId = userId;
		this.name = name;
		this.grade = grade;
		this.notes = notes;
	}

}

export default Dog;
