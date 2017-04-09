import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {autorun, observable} from 'mobx';
import {Form, Button, Loader} from 'semantic-ui-react';
import {resolve} from 'react-resolver';
import {hashHistory} from 'react-router';
import Run from './runs/run';

@inject('shows')
@observer
class View extends Component {

	@observable show;
	@observable loaded = false;

	componentWillMount(){
		console.log('componentWillMount');
		const {id} = this.props.routeParams;
		this.loadShow(id);
	}

	componentWillReceiveProps(nextProps){
		const {id} = nextProps.routeParams;
		console.log('componentWillReceiveProps');
		this.loadShow(id).then(() => console.log);
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
		hashHistory.push(`shows/${this.show.id}/run/${id}`)
	};

	render() {

		const {show} = this;

		if(!this.loaded) return <Loader />;

		const runs = show.runs.map(r => <Run key={r.id} run={r} show={show} editButtonClickHandler={this.editButtonClickHandler.bind(this, r.id)}/>);

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
					{runs}

				</div>
			);
		}
	}

}

export default View;
