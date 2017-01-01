import React, {Component} from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import {Form, Button} from 'semantic-ui-react';
import {resolve} from 'react-resolver';

@observer(['shows'])
@resolve('show', (props) => {
	return props.shows.get(parseInt(props.routeParams.id));
})
class View extends Component {


	componentWillMount() {

	}

	render() {


		return (
			<h1>{this.props.show.name}</h1>
		);

	}

}

export default View;
