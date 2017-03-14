import {observable} from 'mobx';
import auth from './auth';
import Run from './models/run';

class Runs {

    @observable items = {};

    getForShow(showId) {
        return new Promise((resolve, reject) => {

            if(this.items[showId]){
                resolve(this.items[showId]);
                return;
            }

            auth.get(`/shows/${showId}/runs`)
                .then(res => res.data)
                .then(runs => runs.map(r => new Run(r)))
                .then(runs => {
                    this.items[showId] = runs
                    resolve(runs);
                })
                .catch(err => console.warn('loading runs err', err));
        });
    }

    async get(id){

        try{
            let item = await this.getFromLocal(id);

            if(!item){
                item = this.getFromRemote(id);
            }
            return item;
        } catch (err) {
            console.warn('runs', err);
        }
    }

    getFromLocal(id){
        for(let show in Object.keys(this.items)){
            console.log(show);
        }
    }

    getFromRemote(id){

    }

}

const instance = new Runs();

export default instance;
