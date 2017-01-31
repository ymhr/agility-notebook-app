import React, {Component} from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import {Form, Button} from 'semantic-ui-react';
import {resolve} from 'react-resolver';
import {hashHistory} from 'react-router';

@observer(['shows'])
@resolve('show', (props) => {
	return props.shows.get(parseInt(props.routeParams.id));
})
class View extends Component {


	editShow = () => {
		hashHistory.push(`shows/${this.props.show.id}/edit`);
	};

	render() {


		return (
			<div>
				<Button style={{'float':'right'}} onClick={this.editShow}>Edit</Button>
				<h1>{this.props.show.name}</h1>
			</div>
		);

	}

}

export default View;
