import React, {Component} from 'react';
import {observable, autorun} from 'mobx';
import {observer, inject} from 'mobx-react';
import {createViewModel} from 'mobx-utils';
import {Form, Button, Grid, Confirm, Loader} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import Show from 'store/models/show';
import moment from 'moment';

@inject('shows', 'auth')
@observer
class Edit extends Component {

	@observable show;
	createMode = false;

	@observable formLoading = false;

	constructor(props) {
		super(props);

		this.state = {deleteConfirm: false, loading: true};

		if (this.props.match.params.id && this.props.match.params.id !== 'add') {
			this.pageLoading = true;
			this.props.shows.get(this.props.match.params.id)
				.then(show => {
					this.show = show;
					this.show.startDate = moment(this.show.startDate);
					this.show.endDate = moment(this.show.endDate);
					this.show.closingDate = moment(this.show.closingDate);
					this.setState({loading: false});
				});
		} else {
			this.createMode = true;
			this.show = new Show({});
			this.pageLoading = false;

			this.show.startDate = moment();
			this.show.endDate = moment();
			this.show.closingDate = moment();
		}

	}

	onSubmit = (e, data) => {
		e.preventDefault();
		this.formLoading = true;

		if (this.createMode) {
			// this.props.shows.create(data)
			this.show.save()
				.then(res => {
					this.formLoading = false;
					this.props.history.push(`/shows/${this.show.id}`);
				})
				.catch(err => {
					console.error('error', err);
					this.formLoading = false;
				});
		} else {
			this.show.save()
				.then(res => {
					this.formLoading = false;
					this.props.history.push(`/shows/${this.show.id}`)
				})
				.catch(err => {
					console.error('error', err);
					this.formLoading = false;
				})
		}
	};

	onChange = (e) => {
		this.show[e.target.name] = e.target.value;
	};

	onCheckboxChange = (e, data) => {
		this.show[data.name] = data.checked;
	};

	setDate = (type = 'startDate', date) => {
		date.hour(11);
		this.show[type] = date;
	};

	confirmDelete = (e) => {
		e.preventDefault();
		this.setState({deleteConfirm: true});
	};

	deleteShow = (e) => {
		e.preventDefault();
		this.props.shows.delete(this.show.id);
	};

	renderLoading = () => {
		return <Loader />;
	};

	render() {
		if(this.state.loading) return this.renderLoading();

		return (
			<div>
				<h3>Add Show</h3>
				<Form onSubmit={this.onSubmit} loading={this.formLoading}>
					<Form.Field>
						<label htmlFor="name">Name</label>
						<Form.Input name="name" placeholder="What is the name of the show?" onChange={this.onChange}
									defaultValue={this.show.name}/>
					</Form.Field>
					<Form.Field>
						<label htmlFor="postcode">Postcode</label>
						<Form.Input name="postcode" placeholder="Where was the show?" onChange={this.onChange}
									defaultValue={this.show.postcode}/>
					</Form.Field>
					<Form.Field>
						<label htmlFor="notes">Notes</label>
						<Form.TextArea name="notes" placeholder="Do you have any notes for this show?"
									   defaultValue={this.show.notes} onChange={this.onChange} value={this.show.notes}/>
					</Form.Field>
					<Grid columns={3}>
						<Grid.Row>
							<Grid.Column>
								<Form.Field>
									<label htmlFor="startDate">Start date</label>
									<DatePicker name="startDate" placeholder="Start date"
												dateFormat="dddd Do MMMM, YYYY"
												onChange={this.setDate.bind(this, 'startDate')}
												selected={this.show.startDate}/>
								</Form.Field>
							</Grid.Column>
							<Grid.Column>
								<Form.Field>
									<label htmlFor="endDate">End date</label>
									<DatePicker name="endDate" placeholder="End date" dateFormat="dddd Do MMMM, YYYY"
												minDate={this.show.startDate}
												onChange={this.setDate.bind(this, 'endDate')}
												selected={this.show.endDate}/>
								</Form.Field>
							</Grid.Column>
							<Grid.Column>
								<Form.Field>
									<label htmlFor="closingDate">Closing date</label>
									<DatePicker name="closingDate" placeholder="Closing date"
												dateFormat="dddd Do MMMM, YYYY"
												onChange={this.setDate.bind(this, 'closingDate')}
												selected={this.show.closingDate}/>
								</Form.Field>
							</Grid.Column>
						</Grid.Row>
					</Grid>
					<br />

					<Form.Group>
						<Form.Checkbox label="Booked?" toggle checked={this.show.bookedIn} name="bookedIn" onChange={this.onCheckboxChange}/>
						<Form.Checkbox label="Paid?" toggle checked={this.show.paid} name="paid" onChange={this.onCheckboxChange}/>
					</Form.Group>

					<Form.Group>
						<Form.Checkbox label="Hotel Needed?" toggle checked={this.show.hotelNeeded} name="hotelNeeded" onChange={this.onCheckboxChange}/>
						<Form.Checkbox label="Hotel Booked?" toggle checked={this.show.hotelBooked} name="hotelBooked" onChange={this.onCheckboxChange}/>
					</Form.Group>

					<Form.Group>
						<Form.Checkbox label="Holiday Needed?" toggle checked={this.show.holidayNeeded} name="holidayNeeded" onChange={this.onCheckboxChange}/>
						<Form.Checkbox label="Holiday Booked?" toggle checked={this.show.holidayBooked} name="holidayBooked" onChange={this.onCheckboxChange}/>
					</Form.Group>

					<Form.Group>
						<Form.Checkbox label="Camping Needed?" toggle checked={this.show.campingRequired} name="campingRequired" onChange={this.onCheckboxChange}/>
						<Form.Checkbox label="Camping Booked?" toggle checked={this.show.campingBooked} name="campingBooked" onChange={this.onCheckboxChange}/>
						<Form.Checkbox label="Camping Confirmed?" toggle checked={this.show.campingConfirmed} name="campingConfirmed" onChange={this.onCheckboxChange}/>
					</Form.Group>

					<Form.Input label="Booking Platform" value={this.show.bookingPlatform} name="bookingPlatform" placeholder="Booking Platform" onChange={this.onChange}/>
					<Button primary>{this.createMode ? 'Add show' : 'Save changes'}</Button>
					<Button basic color="red" style={{float:'right'}} onClick={this.confirmDelete}>Delete</Button>
				</Form>

				<Confirm
					open={this.state.deleteConfirm}
					onCancel={() => this.setState({deleteConfirm: false})}
					onConfirm={this.deleteShow}
				/>

			</div>

		)
	}
}

export default Edit;
