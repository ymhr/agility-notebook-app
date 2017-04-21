import React, {Component} from 'react';
import {Button, Form, Loader, Divider, Breadcrumb} from 'semantic-ui-react';
import {inject, observer} from 'mobx-react';
import {observable, computed} from 'mobx';
import DogSelect from '../dogs/dogSelect';
import Run from 'store/models/run';
import {hashHistory, Link} from 'react-router';
import DatePicker from 'react-datepicker';
import moment from 'moment';

@inject('dogs', 'shows')
@observer
class EditRun extends Component {

	@observable run;
	@observable formLoading = false;
	@computed get createMode(){
		return !this.run.id;
	}
	@observable show;

	@computed get shouldSpecialTypeFieldBeDisabled() {
		return !(this.run.type === 'special');
	}

	constructor(props){
		super(props);

		this.formLoading = true;

		if(this.props.params.runId){
			this.props.shows.get(this.props.params.id)
				.then(show => this.show = show)
				.then(() => this.run = this.show.getRun(this.props.params.runId))
				.then(() => this.formLoading = false);

		} else {
			this.run = new Run({showId: this.props.params.id});
			this.props.shows.get(this.props.params.id).then(show => this.show = show)
				.then(() => this.formLoading = false);
		}
	}

	onChange = (e) => {
		this.run[e.target.name] = e.target.value;
	};

	onSelectChange = (e, selectedItem) => {

		if(selectedItem.name === 'type') {
			console.log(selectedItem);
			this.run.specialType = '';
		}

		this.run[selectedItem.name] = selectedItem.value;
	};

	setDate = (type = 'date', date) => {
		date.hour(11);
		this.run[type] = date;
	};

	onSubmit = (e, data) => {
		e.preventDefault();
		this.formLoading = true;

		if(this.createMode){
			this.run.save()
				.then(id => {
					this.formLoading = false;
					hashHistory.push(`/shows/${this.run.showId}`);
				});
		} else {
			this.run.save()
				.then(res => console.log(res))
				.then(res => this.formLoading = false);
		}

	};

	render(){

		if(!this.run) return <Loader />;

		const typeOptions = [
			{key: 'agility', text: 'Agility', value: 'agility'},
			{key: 'jumping', text: 'Jumping', value: 'jumping'},
			{key: 'special', text: 'Special', value: 'special'}
		];
		const gradeTypeOptions = [
			{key: 'graded', text: 'Graded', value: 'graded'},
			{key: 'combined', text: 'Combined', value: 'combined'}
		];

		if(this.formLoading){
			return <Loader />
		}

		const selectedDate = (this.run.date) ? this.run.date : this.show.startDate;

		return (
			<div>
				<Breadcrumb>
					<Breadcrumb.Section><Link to={`/shows/${this.show.id}`}>{this.show.name}</Link></Breadcrumb.Section>
					<Breadcrumb.Divider />
					{ this.createMode ? <Breadcrumb.Section>Add run</Breadcrumb.Section> : <Breadcrumb.Section>Edit run</Breadcrumb.Section> }
				</Breadcrumb>
				<h2>Add a run</h2>
				<p>Please add the details of your run here. Bear in mind, this may include details that are only relevant
					once you have <em>completed</em> your run, so you do not need to fill them all in now.</p>

				<Divider horizontal>Booked Run</Divider>
				<Form onSubmit={this.onSubmit} loading={this.formLoading}>
					<Form.Field>
						<DogSelect name="dogId" value={this.run.dogId} onChange={this.onSelectChange}/>
					</Form.Field>
					<Form.Group widths="equal">
						<Form.Field>
							<label>
								Class number
								<input type="number" min="1" name="classNumber" value={this.run.classNumber} onChange={this.onChange} placeholder="Class number" />
							</label>
						</Form.Field>
						<Form.Input label="Judge" placeholder="Who is the judge" name="judge" value={this.run.judge} onChange={this.onChange} />
						<Form.Field>
							<label htmlFor="date">Run Date</label>
							<DatePicker name="date" placeholder="Run Date"
										dateFormat="dddd Do MMMM, YYYY"
										minDate={this.show.startDate}
										maxDate={this.show.endDate}
										onChange={this.setDate.bind(this, 'date')}
										selected={selectedDate}
										style={{width: "50%"}}
							/>
						</Form.Field>
					</Form.Group>
					<Form.Group widths="equal">
						<Form.Select label="Type" placeholder="Type of class" options={typeOptions} value={this.run.type} name="type" onChange={this.onSelectChange} />
						<Form.Input label="Type of special class" type="text" name="specialType" placeholder="What type of special class?" disabled={this.shouldSpecialTypeFieldBeDisabled} value={this.run.specialType} onChange={this.onChange} />
						<Form.Select label="Graded or combined" options={gradeTypeOptions} name="gradeType" value={this.run.gradeType} onChange={this.onSelectChange} />
					</Form.Group>
					<Form.Group widths="equal">
						<Form.Field>
							<label>
								Class grade
								<input type="text" name="grade" placeholder="e.g. 1-3" value={this.run.grade} onChange={this.onChange}/>
							</label>
						</Form.Field>
						<Form.Input label="Grade at the time" placeholder="When you did this run, what grade were you?" name="currentGrade" value={this.run.currentGrade} onChange={this.onChange} />
					</Form.Group>

					<Divider horizontal>Running order for run</Divider>

					<Form.Group widths="equal">
						<Form.Input label="Running Order" placeholder="Which number are you?" name="runningOrder" value={this.run.runningOrder} onChange={this.onChange} />
						<Form.Input label="Ring Number" placeholder="Which ring is it in?" name="ringNumber" value={this.run.ringNumber} onChange={this.onChange} />
						<Form.Field>
							<label>
								Class size
								<input type="number" min="0" name="classSize" placeholder="How large was the class" value={this.run.classSize} onChange={this.onChange}/>
							</label>
						</Form.Field>
					</Form.Group>

					<Divider horizontal>After Run</Divider>

					<Form.Group widths="equal">
						<Form.Field>
							<label>
								Course length
								<input type="number" min="0" name="courseLength" placeholder="The length of the course" value={this.run.courseLength} onChange={this.onChange}/>
							</label>
						</Form.Field>
						<Form.Field>
							<label>
								Course time
								<input type="number" min="0" step="0.001" name="courseTime" placeholder="Course time" value={this.run.courseTime} onChange={this.onChange}/>
							</label>
						</Form.Field>
					</Form.Group>

					<Form.Group widths="equal">
						<Form.Field>
							<label>
								What place did you get?
								<input type="text" name="place" placeholder="Leave blank if you did not place" value={this.run.place} onChange={this.onChange}/>
							</label>
						</Form.Field>
						<Form.Field>
							<label>
								How many faults did you get?
								<input type="number" min="0" step="0.001" name="faults" placeholder="Leave blank if you were clear!" value={this.run.faults} onChange={this.onChange}/>
							</label>
						</Form.Field>
						<Form.Field>
							<label>
								Your time
								<input type="number" min="0" step="0.001" name="runTime" placeholder="Your run time" value={this.run.runTime} onChange={this.onChange}/>
							</label>
						</Form.Field>
					</Form.Group>

					<Form.TextArea autoHeight value={this.run.notes} onChange={this.onChange} name="notes" label="Notes" placeholder="Enter any other notes you have about this show. This space will expand as you type." />
					<Button primary type="submit">{this.createMode ? 'Add run' : 'Save changes'}</Button>
				</Form>
			</div>
		);

	}

}

export default EditRun;
