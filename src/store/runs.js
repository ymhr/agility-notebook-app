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

    async get(showId, id){
        try{
            let item = await this.getFromLocal(showId, id);

            if(!item){
                item = await this.getFromRemote(showId, id);
            }
            return item;
        } catch (err) {
            console.warn('runs', err);
        }
    }

    getFromLocal(showId, id){
        return new Promise((resolve, reject) => {

            if(!Object.keys(this.items).length) resolve(null);

            Object.keys(this.items).forEach(show => {
                if(show == showId){
                    const runs = this.items[show];
                    if(!runs){
                        resolve(null);
                        return;
                    }

                    const run = runs.filter(r => r.id == id)[0];

                    if(run) {
                        resolve(run);
                        return;
                    } else {
                        resolve(null);
                        return;
                    }
                }
            });
            resolve(null);
        });
    }

    getFromRemote(showId, id){
        return new Promise((resolve, reject) => {
            auth.get(`/shows/${showId}/runs/${id}`)
                .then(res => {
                    const run = new Run(res.data);
                    if(!Array.isArray(this.items[showId])) this.items[showId] = [];
                    this.items[showId].push(run);
                    resolve(run);
                })
                .catch(err => reject(err));
        });
    }

    create(showId, data) {
		return auth.post(`/shows/${showId}/runs`, data);
	}

}

const instance = new Runs();

export default instance;
