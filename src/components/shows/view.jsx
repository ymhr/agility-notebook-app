import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {autorun} from 'mobx';
import {Form, Button, Loader} from 'semantic-ui-react';
import {resolve} from 'react-resolver';
import {hashHistory} from 'react-router';
import Run from './runs/run';
import AddRunModal from './runs/addRunModal';

@inject('shows')
@resolve('show', (props) => {
	return props.shows.get(parseInt(props.routeParams.id));
})
@observer
class View extends Component {

	editShow = () => {
		hashHistory.push(`shows/${this.props.show.id}/edit`);
	};

	render() {

		const {show} = this.props;

		let runs = <Loader active inline />;
		if(show.runsLoaded)
		{
			runs = show.runs.map(r => <Run key={r.id} run={r} show={show}/>);
		}

		return (
			<div>
				<Button style={{'float':'right'}} onClick={this.editShow}>Edit</Button>
				<h1>{show.name}</h1>

				<h2>Runs</h2>
				{/*<Button >Add a run!</Button>*/}
				<AddRunModal/>
				{runs}

			</div>
		);


	}

}

export default View;
