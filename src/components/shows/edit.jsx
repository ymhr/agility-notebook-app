import React, {Component} from 'react';
import {observable, autorun} from 'mobx';
import {observer, inject} from 'mobx-react';
import {createViewModel} from 'mobx-utils';
import {Form, Button, Grid} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import Show from 'store/models/show';
import {hashHistory} from 'react-router';
import moment from 'moment';
import {resolve} from 'react-resolver';

@inject('shows', 'auth')
@resolve('existingShow', (props) => {
	if (props.routeParams.id)
		return props.shows.get(parseInt(props.routeParams.id));
})
@observer
class Edit extends Component {

	show;
	vm;
	createMode = false;

	@observable formLoading = false;

	constructor(props) {
		super(props);

		if (this.props.existingShow) {
			this.show = this.props.existingShow;
		} else {
			this.createMode = true;
			this.show = new Show({});
		}

		this.vm = createViewModel(this.show);

		if (this.createMode) {
			this.vm.startDate = moment();
			this.vm.endDate = moment();
		} else {
			this.vm.startDate = moment(this.show.startDate);
			this.vm.endDate = moment(this.show.endDate);
		}

	}


	onSubmit = (e, data) => {
		e.preventDefault();
		this.formLoading = true;

		if (this.createMode) {
			// this.props.shows.create(data)
			this.vm.submit();

			this.show.save()
				.then(res => {
					console.log('success', res);
					this.props.shows.items.push(new Show(res.data));
					this.formLoading = false;
					hashHistory.push('/');
				})
				.catch(err => {
					console.error('error', err);
					this.formLoading = false;
				});
		} else {
			this.props.shows.update(this.show.id, data)
				.then(res => {
					this.vm.submit();
					this.formLoading = false;
					hashHistory.push(`/shows/${this.show.id}`)
				})
				.catch(err => {
					console.error('error', err);
					this.formLoading = false;
				})
		}


	};

	onChange = (e) => {
		this.vm[e.target.name] = e.target.value;
	};

	setDate = (type = 'startDate', date) => {
		this.vm[type] = date;
		console.log(type, this.vm[type]);
	};

	render() {
		return (

			<div>
				<h3>Add Show</h3>
				<Form onSubmit={this.onSubmit} loading={this.formLoading}>
					<Form.Field>
						<label htmlFor="name">Name</label>
						<Form.Input name="name" placeholder="What is the name of the show?" onChange={this.onChange}
									defaultValue={this.vm.name}/>
					</Form.Field>
					<Form.Field>
						<label htmlFor="postcode">Postcode</label>
						<Form.Input name="postcode" placeholder="Where was the show?" onChange={this.onChange}
									defaultValue={this.vm.postcode}/>
					</Form.Field>
					<Form.Field>
						<label htmlFor="notes">Notes</label>
						<Form.TextArea name="notes" placeholder="Do you have any notes for this show?"
									   defaultValue={this.vm.notes} onChange={this.onChange} value={this.vm.notes}/>
					</Form.Field>
					<Grid columns={3}>
						<Grid.Row>
							<Grid.Column>
								<Form.Field>
									<label htmlFor="startDate">Start date</label>
									<DatePicker name="startDate" placeholder="Start date"
												dateFormat="dddd Do MMMM, YYYY"
												onChange={this.setDate.bind(this, 'startDate')}
												selected={this.vm.startDate}/>
								</Form.Field>
							</Grid.Column>
							<Grid.Column>
								<Form.Field>
									<label htmlFor="endDate">End date</label>
									<DatePicker name="endDate" placeholder="End date" dateFormat="dddd Do MMMM, YYYY"
												minDate={this.vm.startDate}
												onChange={this.setDate.bind(this, 'endDate')}
												selected={this.vm.endDate}/>
								</Form.Field>
							</Grid.Column>
						</Grid.Row>
					</Grid>
					<Button primary>{this.createMode ? 'Add show' : 'Save changes'}</Button>
				</Form>
			</div>

		)
	}
}

export default Edit;
