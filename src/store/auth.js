import {observable, computed, when} from 'mobx';
import axios from 'axios';


class Auth {
	request;

	@observable token;

	@computed get isAuthed(){
		return this.token && typeof this.token !== 'undefined';
	}


	constructor(){
		this.token = this.getToken();

		when(
			() => this.token && typeof this.token !== 'undefined',
			() => {
				this.request = axios.create({
					baseURL: API_URL,
				});
				this.request.defaults.headers.common['Authorization'] = 'Bearer '+this.token;
			}
		)

	}

	getToken() {
		return localStorage.getItem('token');
	}

	setToken(token) {
		localStorage.setItem('token', token);
		this.token = token;
	}

	logout(){
		localStorage.removeItem('token');
		this.token = undefined;
	}

	//Make APi request
	get(endpoint, data = {}){
		if(this.getToken() !== null)
			return this.request(endpoint);
	}

	post(endpoint, data = {}){
		if(this.getToken() !== null)
			return this.request.post(endpoint, data);
	}

	checkAuthFromBackend(){
		return this.get('/api/check')
			.catch(err => {
				console.log('No auth!', err);
				this.logout();
			});
	}

}

const instance = new Auth();
export default instance;
