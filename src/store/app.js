import {when, observable} from 'mobx';
import shows from './shows';
import settings from './settings';
import dogs from './dogs';

class App {
    @observable ready = false;

    constructor(){
        when(
            () => {
                console.log('shows', shows.loaded, 'settings', settings.loaded, 'dogs', dogs.loaded)
                return (shows.loaded && settings.loaded && dogs.loaded)
            },
            () => this.ready = true
        );
    }

}

const instance = new App();

export default instance;
