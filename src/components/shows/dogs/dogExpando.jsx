import React, {Component} from 'react';
import {Icon, Segment} from 'semantic-ui-react';

class DogExpando extends Component {

	constructor() {
		super();
		this.state = {
			open: false
		};
	}

	expand = () => {
		this.setState({open: true});
	};

	close = () => {
		this.setState({open: false});
	};

	render() {
		const {dog} = this.props;

		if (!this.state.open) {
			return (
				<div>
					<span onClick={this.expand}>{dog.name} <Icon name="edit" /></span>
				</div>
			);
		} else {
			return (
				<Segment>
					<Icon name="close" onClick={this.close} />
					<h5>{dog.name}</h5>
					<p>Grade {dog.grade}</p>
				</Segment>
			);
		}


	}

}

export default DogExpando;