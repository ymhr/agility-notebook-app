import {observable, computed, action} from 'mobx';
import auth from './auth';

class Profile {

	@observable userId;

	@observable firstName = '';
	@observable lastName = '';
	@observable loaded = false;

	@computed get fullName() {
		return this.firstName + ' ' + this.lastName;
	};

	@action loadProfile(){
		auth.get('profile')
			.then(res => this.populateProfile(res.data))
			.then(() => this.loaded = true);
	}

	populateProfile(data){
		this.firstName = data.firstName;
		this.lastName = data.lastName;
	};

	persistData() {
		if (!this.userId) throw Exception;

	}

	@action getData() {
		if (!this.userId) throw Exception;

	}


}

const instance = new Profile();

export default instance;
