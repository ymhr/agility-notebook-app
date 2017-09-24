import {when, observable} from 'mobx';
import shows from './shows';
import settings from './settings';
import dogs from './dogs';
import handlers from './handlers';

class App {
    @observable ready = false;

    constructor(){
        when(
            () => (
                shows.loaded
                && settings.loaded
                && dogs.loaded
                && handlers.loaded),
            () => this.ready = true
        );
    }

}

const instance = new App();

export default instance;
