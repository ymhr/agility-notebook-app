import {observable} from 'mobx';

class Global {
    @observable menuOpen = false;

    constructor(){}

    toggleMenu(){
        this.menuOpen = !this.menuOpen;
    }

    closeMenu(){
        this.menuOpen = false;
    }

}

const instance = new Global();

export default instance;
