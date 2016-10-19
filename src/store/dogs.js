import {observable} from 'mobx';

import Dog from './dog';

class Dogs {

    @observable dogs = [];

    constructor() {

    }

    getDog(id){
        
    }

}

const instance = new Dogs();

export default instance;
