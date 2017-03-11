import {observable} from 'mobx';

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

}

export default Dog;
