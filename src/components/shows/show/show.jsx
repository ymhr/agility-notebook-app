import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {List, Button, Label, Icon} from 'semantic-ui-react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import styles from './style.css';

@observer
class Show extends Component {
	
	constructor(){
		super();
		this.state = {expanded: false};
	}

	itemClick = (show) => {
		console.log(show);
		console.log(this.props);
		this.props.history.push(`/shows/${show.id}`);
	};

	toggleExpanded = (e) => {
		e.preventDefault();
		e.stopPropagation();
		console.log('called');
		this.setState({expanded: !this.state.expanded});
	};

	arrowButton = () => {
		const props = {
			onClick: this.toggleExpanded
		};
		return (
			this.state.expanded ?
				<Button circular icon="angle up" {...props} /> :
				<Button circular icon="angle down" {...props} />
		);
	};

	expandedDetails = () => {

		if(!this.state.expanded) return '';

		const {show} = this.props;
		return (
			<div>
				<Label className={styles.showDetails}>Runs <Label.Detail>{show.runs.length}</Label.Detail></Label>
				<Label className={styles.showDetails}>Booking platform <Label.Detail>{show.bookingPlatform}</Label.Detail></Label>
				<Label className={styles.showDetails}>Booked <Label.Detail>{show.bookedIn ? <Icon name="check" /> : <Icon name="close" />}</Label.Detail></Label>
				<Label className={styles.showDetails}>Paid <Label.Detail>{show.paid ? <Icon name="check" /> : <Icon name="close" />}</Label.Detail></Label>
				<Label className={styles.showDetails}>Hotel needed <Label.Detail>{show.hotelNeeded ? <Icon name="check" /> : <Icon name="close" />}</Label.Detail></Label>
				<Label className={styles.showDetails}>Hotel booked <Label.Detail>{show.hotelBooked ? <Icon name="check" /> : <Icon name="close" />}</Label.Detail></Label>
				<Label className={styles.showDetails}>Holiday needed <Label.Detail>{show.holidayNeeded ? <Icon name="check" /> : <Icon name="close" />}</Label.Detail></Label>
				<Label className={styles.showDetails}>Holiday booked <Label.Detail>{show.holidayBooked ? <Icon name="check" /> : <Icon name="close" />}</Label.Detail></Label>
				<Label className={styles.showDetails}>Camping needed <Label.Detail>{show.campingRequired ? <Icon name="check" /> : <Icon name="close" />}</Label.Detail></Label>
				<Label className={styles.showDetails}>Camping booked <Label.Detail>{show.campingBooked ? <Icon name="check" /> : <Icon name="close" />}</Label.Detail></Label>
				<Label className={styles.showDetails}>Camping confirmed <Label.Detail>{show.campingConfirmed ? <Icon name="check" /> : <Icon name="close" />}</Label.Detail></Label>
			</div>
		);
	};

	render() {

		const {show} = this.props;

		const closingSoon = (show.closingSoon && !show.bookedIn ? <div className={styles.showClosingSoon}>Registration is ending in {show.closingDate.diff(moment(), 'days')} day(s)</div> : '');

		const classNames = [];

		if(show.endDate && show.endDate.diff(moment(), 'days') < 0) classNames.push(styles.oldShow);

		return (

			<List.Item onClick={this.itemClick.bind(this, show)} className={classNames.join(' ')}>
				{/*<List.Content floated="right">Runs: {show.runs.length}</List.Content>*/}
				<List.Content floated="right">{this.arrowButton()}</List.Content>
				<List.Content>
					<List.Header>{show.name}</List.Header>
					<List.Description>
						<div>{moment(show.startDate).format('dddd, MMMM Do YYYY')} - {moment(show.endDate).format('dddd, MMMM Do YYYY')}</div>
						{closingSoon}
						{this.expandedDetails()}
					</List.Description>
				</List.Content>
			</List.Item>

		);

	}
}

Show.propTypes = {
	show: PropTypes.object.isRequired
};

export default withRouter(Show);
