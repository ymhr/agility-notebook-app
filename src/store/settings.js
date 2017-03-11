import {observable} from 'mobx';
import auth from './auth';

class Settings {
	@observable showEmptyMonths;
	@observable loaded = false;

	constructor() {
		//Set whatever we want to be the default. We have to set the default to make sure the prop exists when we come to check it
		this.setDefaults();

		//Load the settings from the web
		// this.loadSettings();
	}

	setDefaults() {
		this.showEmptyMonths = true;
	}

	loadSettings() {
		auth.get('/settings').then(res => this.setSettings(res.data));
	}

	setSettings(data) {

		if(data.length === 0) this.loaded = true;

		let i = 0;
		data.forEach(d => {
			if (this.hasOwnProperty(d.name)) {
				this.setSetting(d.name, d.value);
			}
			i++;

			if(i === data.length) {
				this.loaded = true;
			}
		});

	}

	setSetting(name, value){
		switch(name){
			case 'showEmptyMonths':
				value = (value == '1');
				break;
		}
		this[name] = value;
	}

	update(name, value){
		this[name] = value;
		console.log('updating');

		auth.post('/settings', {name, value})
			.then(res => console.log('updated'))
			.catch(err => console.error(err));
	}

}

const instance = new Settings();

export default instance;
