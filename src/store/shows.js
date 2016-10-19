import {observable} from 'mobx';
import Show from './show';
import auth from './auth';

class Shows {

    @observable items = [];

    load = () => {

		auth.get('/shows')
			.then(res => {
				this.items = res.data.map(i => new Show(i));
			});
    };

}

const instance = new Shows();

export default instance;
