import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {autorun, observable} from 'mobx';
import {Form, Button, Loader, Grid, Header, Label, Icon} from 'semantic-ui-react';
import {reduce} from 'lodash';
import styled from 'styled-components';
import Run from './runs/run';
import RunsByDate from './runs/RunsByDate';
import GiantButton from 'components/general/giantButton';

@inject('shows')
@observer
class View extends Component {

	@observable show;
	@observable loaded = false;

	constructor(props) {
		super(props);
	}

	componentWillMount(){
		const {id} = this.props.match.params;
		this.loadShow(id);
	}

	componentWillReceiveProps(nextProps){
		const {id} = nextProps.match.params;
		this.loadShow(id);
	}

	loadShow(id){
		return this.props.shows.get(id)
			.then(show => this.show = show)
			.then(() => this.loaded = true);
	}

	editShow = () => {
		this.props.history.push(`/shows/${this.show.id}/edit`);
	};

	addRun = () => {
		this.props.history.push(`/shows/${this.show.id}/run/add`);
	};

	editButtonClickHandler = (id) => {
		this.props.history.push(`/shows/${this.props.routeParams.id}/run/${id}`)
	};

	toggleAllRunsExpanded = () => {
		const {show} = this;

		show.runs.forEach(r => r.expandToggle())
	};

	addButton = () => {
		if(this.show.runs.length){
			return <Button fluid onClick={this.addRun}><Icon name="plus" /> Add run</Button>
		} else {
			return <GiantButton
				title="Add a new run"
				icon="plus"
				description="Click this to add a run to this show. This allows you to record, times, rings, places, etc!"
				onClick={this.addRun}
			/>
		}
	};

	render() {
		const {show} = this;

		if(!this.loaded) return <Loader />;

		// const runs = show.runs.map(r => <Grid.Column key={r.id} mobile={16} tablet={8} computer={4}><Run key={r.id} run={r} show={show} editButtonClickHandler={this.editButtonClickHandler.bind(this, r.id)}/></Grid.Column>);

		const runs = show.splitRunsByDateAndDog();

		const runsForDisplay = Object.keys(runs).map(date => <RunsByDate key={date} date={date} dogs={runs[date]} />);

		const subHeading = (show.startDate.diff(show.endDate, 'days') ? show.startDate.format('dddd Do MMMM YYYY') + ' - ' + show.endDate.format('dddd Do MMMM YYYY') : show.startDate.format('dddd Do MMMM'));

		const LabelWrapper = styled(Label)`
			margin-bottom: 10px !important;
			margin-left: 10px !important;
		`;

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
					<Header as="h1">
						<Header.Content>{show.name}</Header.Content>
						<Header.Subheader>{subHeading}</Header.Subheader>
					</Header>

					<p>{show.notes}</p>
					<LabelWrapper>Booking platform <Label.Detail>{show.bookingPlatform}</Label.Detail></LabelWrapper>
					<LabelWrapper>Booked <Label.Detail>{show.bookedIn ? <Icon name="check" /> : <Icon name="close" />}</Label.Detail></LabelWrapper>
					<LabelWrapper>Paid <Label.Detail>{show.paid ? <Icon name="check" /> : <Icon name="close" />}</Label.Detail></LabelWrapper>
					<LabelWrapper>Hotel needed <Label.Detail>{show.hotelNeeded ? <Icon name="check" /> : <Icon name="close" />}</Label.Detail></LabelWrapper>
					<LabelWrapper>Hotel booked <Label.Detail>{show.hotelBooked ? <Icon name="check" /> : <Icon name="close" />}</Label.Detail></LabelWrapper>
					<LabelWrapper>Holiday needed <Label.Detail>{show.holidayNeeded ? <Icon name="check" /> : <Icon name="close" />}</Label.Detail></LabelWrapper>
					<LabelWrapper>Holiday booked <Label.Detail>{show.holidayBooked ? <Icon name="check" /> : <Icon name="close" />}</Label.Detail></LabelWrapper>
					<LabelWrapper>Camping needed <Label.Detail>{show.campingRequired ? <Icon name="check" /> : <Icon name="close" />}</Label.Detail></LabelWrapper>
					<LabelWrapper>Camping booked <Label.Detail>{show.campingBooked ? <Icon name="check" /> : <Icon name="close" />}</Label.Detail></LabelWrapper>
					<LabelWrapper>Camping confirmed <Label.Detail>{show.campingConfirmed ? <Icon name="check" /> : <Icon name="close" />}</Label.Detail></LabelWrapper>

					<h2>Runs</h2>
					{this.addButton()}
					{this.show.runs.length ? <Button basic size="mini" style={{float: 'right'}} onClick={this.toggleAllRunsExpanded}>Toggle all</Button> : ''}
					{runsForDisplay}

				</div>
			);
		}
	}

}

export default View;
