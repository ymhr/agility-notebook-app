import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {autorun, observable} from 'mobx';
import {Form, Button, Loader, Grid} from 'semantic-ui-react';
import {resolve} from 'react-resolver';
import {hashHistory} from 'react-router';
import {reduce} from 'lodash';
import Run from './runs/run';
import RunsByDate from './runs/RunsByDate';

@inject('shows')
@observer
class View extends Component {

	@observable show;
	@observable loaded = false;

	componentWillMount(){
		const {id} = this.props.routeParams;
		this.loadShow(id);
	}

	componentWillReceiveProps(nextProps){
		console.log('will receive props');
		const {id} = nextProps.routeParams;
		this.loadShow(id);
	}

	loadShow(id){
		return this.props.shows.get(id)
			.then(show => this.show = show)
			.then(() => this.loaded = true);
	}

	editShow = () => {
		hashHistory.push(`shows/${this.show.id}/edit`);
	};

	addRun = () => {
		hashHistory.push(`shows/${this.show.id}/run/add`);
	};

	editButtonClickHandler = (id) => {
		hashHistory.push(`shows/${this.props.routeParams.id}/run/${id}`)
	};

	render() {
		const {show} = this;

		if(!this.loaded) return <Loader />;

		// const runs = show.runs.map(r => <Grid.Column key={r.id} mobile={16} tablet={8} computer={4}><Run key={r.id} run={r} show={show} editButtonClickHandler={this.editButtonClickHandler.bind(this, r.id)}/></Grid.Column>);

		const runs = show.splitRunsByDateAndDog();

		const runsForDisplay = Object.keys(runs).map(date => <RunsByDate key={date} date={date} dogs={runs[date]} />);

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
					{runsForDisplay}
					{/*<Grid>*/}
						{/*{runs}*/}
					{/*</Grid>*/}

				</div>
			);
		}
	}

}

export default View;
