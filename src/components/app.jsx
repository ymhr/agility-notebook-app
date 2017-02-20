import React, {Component} from 'react';
import {observer, Provider} from 'mobx-react';
import store from '../store/index';
import {Container} from 'semantic-ui-react';
import {Router, hashHistory} from 'react-router';
import URL from 'domurl';
import routes from './routes';
import Login from './login/index';

require('react-datepicker/dist/react-datepicker.css');

const url = new URL(window.location.href);

if (url.query.token) {
	store.auth.setToken(url.query.token);
}

//Make sure that this user is authed
if (store.auth.isAuthed) {
	store.auth.checkAuthFromBackend()
	//If the user auths successfully, then there are some things we need to load
		.then(() => {
			store.profile.loadProfile();
			store.settings.loadSettings();
			store.dogs.load();
		});
}

@observer
class App extends Component {

	render() {

		if (!store.auth.isAuthed) {
			return (
				<Login />
			);
		}

		//Make sure that the settings are loaded
		if (store.settings.loaded === false) {
			return <h2>Loading settings</h2>;
		}

		return (
			<Container>
				<Provider {...store}>
					<Router history={hashHistory} routes={routes}/>
				</Provider>
			</Container>
		)
	}

}


export default App;
