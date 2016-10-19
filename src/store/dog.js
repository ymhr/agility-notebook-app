import {observable} from 'mobx';

class Dog {

    id;
    userId;
    @observable name;
    @observable officialName;
    @observable grade
    @observable breed
    @observable size;

    constructor({id, userId, name, officialName, grade, breed, size}) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.officialName = officialName;
        this.grade = grade;
        this.breed = breed;
        this.size = size;
    }

    persistData = () => {
        let updateData = {
            id: this.id,
            userId: this.userId,
            name: this.name,
            officialName: this.officialName,
            grade: this.grade,
            breed: this.breed,
            size: this.size
        };

        horizon('dogs')
            .upsert({...updateData});
    };

}

export default Dog;
