import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {autorun, observable} from 'mobx';
import {Form, Button, Loader, Grid, Header, Label, Icon} from 'semantic-ui-react';
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

	toggleAllRunsExpanded = () => {
		const {show} = this;

		show.runs.forEach(r => r.expandToggle())
	};

	showPrintable = () => {
		hashHistory.push(`shows/${this.show.id}/printable`);
	};

	render() {
		const {show} = this;

		if(!this.loaded) return <Loader />;

		// const runs = show.runs.map(r => <Grid.Column key={r.id} mobile={16} tablet={8} computer={4}><Run key={r.id} run={r} show={show} editButtonClickHandler={this.editButtonClickHandler.bind(this, r.id)}/></Grid.Column>);

		const runs = show.splitRunsByDateAndDog();

		const runsForDisplay = Object.keys(runs).map(date => <RunsByDate key={date} date={date} dogs={runs[date]} />);

		const subHeading = (show.startDate.diff(show.endDate, 'days') ? show.startDate.format('dddd Do MMMM YYYY') + ' - ' + show.endDate.format('dddd Do MMMM YYYY') : show.startDate.format('dddd Do MMMM'));

		if(this.props.children){
			return (
				<div>
					{this.props.children}
				</div>
			)
		} else {
			return (
				<div>
					<Button onClick={this.showPrintable}>Printable view</Button>
					<Button style={{'float':'right'}} onClick={this.editShow}>Edit</Button>
					<Header as="h1">
						<Header.Content>{show.name}</Header.Content>
						<Header.Subheader>{subHeading}</Header.Subheader>
					</Header>

					<p>{show.notes}</p>

					<Label>Booking platform <Label.Detail>{show.bookingPlatform}</Label.Detail></Label>
					<Label>Booked <Label.Detail>{show.bookedIn ? <Icon name="check" /> : <Icon name="close" />}</Label.Detail></Label>
					<Label>Paid <Label.Detail>{show.paid ? <Icon name="check" /> : <Icon name="close" />}</Label.Detail></Label>
					<Label>Hotel needed <Label.Detail>{show.hotelNeeded ? <Icon name="check" /> : <Icon name="close" />}</Label.Detail></Label>
					<Label>Hotel booked <Label.Detail>{show.hotelBooked ? <Icon name="check" /> : <Icon name="close" />}</Label.Detail></Label>
					<Label>Holiday needed <Label.Detail>{show.holidayNeeded ? <Icon name="check" /> : <Icon name="close" />}</Label.Detail></Label>
					<Label>Holiday booked <Label.Detail>{show.holidayBooked ? <Icon name="check" /> : <Icon name="close" />}</Label.Detail></Label>
					<Label>Camping needed <Label.Detail>{show.campingRequired ? <Icon name="check" /> : <Icon name="close" />}</Label.Detail></Label>
					<Label>Camping booked <Label.Detail>{show.campingBooked ? <Icon name="check" /> : <Icon name="close" />}</Label.Detail></Label>
					<Label>Camping confirmed <Label.Detail>{show.campingConfirmed ? <Icon name="check" /> : <Icon name="close" />}</Label.Detail></Label>

					<h2>Runs</h2>
					<Button onClick={this.addRun}>Add run</Button>
					<Button basic size="mini" style={{float: 'right'}} onClick={this.toggleAllRunsExpanded}>Toggle all</Button>
					{runsForDisplay}

				</div>
			);
		}
	}

}

export default View;
