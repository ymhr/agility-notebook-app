import React, {Component} from 'react';
import DevTools from 'mobx-react-devtools';
import {observer, Provider} from 'mobx-react';
import {when} from 'mobx';
import store from '../store/index';
import {Container, Dimmer, Loader} from 'semantic-ui-react';
import {HashRouter as Router, withRouter} from 'react-router-dom';
import URL from 'domurl';
import routes, {flatRoutes} from './routes';
import Login from './login/index';
import Root from 'components/root/index.jsx';

require('react-datepicker/dist/react-datepicker-cssmodules.css');

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
			store.shows.load();
			store.handlers.load();
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
		if (!store.app.ready) {
			return (
				<Dimmer active page>
					<Loader>Getting a few things in order</Loader>
				</Dimmer>
			);
		}

		return (
			<Router>
				<Provider {...store}>
					<Root />
				</Provider>
			</Router>
			
	)
	}

}


export default App;
