import {observable, computed, action} from 'mobx';

class Profile {

    @observable userId;
    propsToUpdate = ['firstName', 'lastName', 'age'];

    @observable firstName = '';
    @observable lastName = '';
    @observable age = '';
    @computed get fullName(){
        return this.firstName + ' ' + this.lastName;
    };

    constructor(){
        console.log('yeyeyey');
    }

    persistData()
    {
        if(!this.userId) throw Exception;

        var dataToUpdate = this.propsToUpdate.reduce((updateData, prop) => {
            updateData[prop] = this[prop];
            return updateData;
        }, {});

    }

    @action getData(){
        if(!this.userId) throw Exception;

    }


}

const instance = new Profile();

export default instance;
