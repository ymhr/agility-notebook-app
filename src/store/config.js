class Config {
	// apiUrl: 'http://localhost:3000'

	constructor(){
		window.apiUrl = 'http://localhost:3000';
	}
}
const instance = new Config();
export default instance;