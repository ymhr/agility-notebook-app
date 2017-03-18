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

	addRun = () => {
		hashHistory.push(`shows/${this.props.show.id}/run/add`);
	};

	editButtonClickHandler = (id) => {
		hashHistory.push(`shows/${this.props.show.id}/run/${id}`)
	}

	render() {

		const {show} = this.props;

		let runs = <Loader active inline />;
		if(show.runsLoaded)
		{
			runs = show.runs.map(r => <Run key={r.id} run={r} show={show} editButtonClickHandler={this.editButtonClickHandler.bind(this, r.id)}/>);
		}

		if(this.props.children){
			return (
				<div>
					{this.props.children}
				</div>
			)
		} else {
			return (
				<div>
					<Button style={{'float':'right'}} onClick={this.editShow}>Edit</Button>
					<h1>{show.name}</h1>

					<h2>Runs</h2>
					<Button onClick={this.addRun}>Add run</Button>
					{/*}<AddRunModal showId={show.id}/>*/}
					{runs}

				</div>
			);
		}
	}

}

export default View;
