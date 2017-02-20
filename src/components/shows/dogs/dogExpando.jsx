import React, {Component} from 'react';
import {Icon, Modal} from 'semantic-ui-react';

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

		const openStyle = {
			"display":"block"
		};

		if (!this.state.open) {
			return (
				<div className={this.props.className}>
					<span onClick={this.expand}>{dog.name} <Icon name="edit" /></span>
				</div>
			);
		} else {
			return (
				<Modal open={this.state.open} className={this.props.className}>
					<Modal.Header>{dog.name}</Modal.Header>
					<Icon name="close" onClick={this.close} />
					<Modal.Content>
						<Modal.Description>
							<p>Current grade: {dog.grade}</p>
							<p>Official name: {dog.officialName}</p>
						</Modal.Description>
					</Modal.Content>
				</Modal>
			);
		}


	}

}

export default DogExpando;