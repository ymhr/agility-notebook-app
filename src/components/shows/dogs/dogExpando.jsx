import React, {Component} from 'react';
import {Icon, Modal, Popup, List} from 'semantic-ui-react';
import moment from 'moment';

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

	createDetailsList = () => {
		const {dog} = this.props;

		const fieldsToRemove = ['id', 'name', 'userId', 'notes', 'handlerId', 'meta'];

		const fieldNamesMap = {
			grade: "Grade",
			notes: "Notes",
			officialName: "Official Name",
			height: "Height",
			lowerHeight: "Lower Height",
			notForCompetition: "Not for Competition",
			registeredNumber: "Registered Number",
			breed: "Breed",
			sex: "Sex",
			dateOfBirth: "Date of Birth",
			handler: "Handler"
		};

		const dogDetails = Object.keys(dog)
			.filter(k => fieldsToRemove.indexOf(k) === -1)
			.map(k => {
				return {key: k, name: fieldNamesMap[k]}
			})
			.map(k => {
				if(!dog[k.key]) return;

				const value = do {
					if(k.key === 'dateOfBirth') {
						dog[k.key].format('d/M/Y');
					} else if (k.key === 'notForCompetition') {
						dog['notForCompetition'] ? 'yes' : 'no';
					} else if (k.key === 'lowerHeight') {
						dog['lowerHeight'] ? 'yes' : 'no';
					} else if (k.key === 'handler') {
						dog.handler.name;
					} else {
						dog[k.key];
					}
				};

				return (
					<List.Item key={Math.random()}>
						<List.Header>{k.name}</List.Header>
						<List.Description>{value}</List.Description>
					</List.Item>
				);
			});

		return dogDetails;
	};

	render() {
		const {dog} = this.props;

		const openStyle = {
			"display":"block"
		};

		if (!this.state.open) {
			const label = "Click this to view details of " + dog.name;
			return (
				<div className={this.props.className}>
					<Popup
						trigger={<span onClick={this.expand}>{dog.name} <Icon name="external" /></span>}
						content={label} />
				</div>
			);
		} else {
			return (
				<Modal open={this.state.open} className={this.props.className}>
					<Modal.Header>{dog.name}</Modal.Header>
					<Icon name="close" onClick={this.close} />
					<Modal.Content>
						<Modal.Description>
							<List divided>
								{this.createDetailsList()}
							</List>
						</Modal.Description>
					</Modal.Content>
				</Modal>
			);
		}


	}

}

export default DogExpando;
