import {observable} from 'mobx';

import Dog from './dog';

class Dogs {

    @observable dogs = [];

    constructor() {
        horizon
            .currentUser()
            .fetch()
            .subscribe(user => {
                horizon('dogs')
                    .findAll({userId: user.id})
                    .watch()
                    .subscribe(
                        dogs => {
                            if(dogs) this.dogs = dogs.map(d => new Dog(d));
                        }
                    )
            })
    }

    getDog(id){
        return horizon('dogs')
                .find({id})
                .fetch();
    }

}

const instance = new Dogs();

export default instance;
