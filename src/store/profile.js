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

        horizon('users')
            .update({
                id: this.userId,
                profile: {
                    ...dataToUpdate
                }
            });
    }

    @action getData(){
        if(!this.userId) throw Exception;
        horizon('users')
            .find(this.userId)
            .watch()
            .map(d => d.profile)
            .subscribe(data => {
                for (let d in data) {
                    if (data.hasOwnProperty(d)) {
                        if(this.propsToUpdate.includes(d)) {
                            this[d] = data[d];
                        }
                    }
                }
            })
    }


}

const instance = new Profile();

export default instance;
