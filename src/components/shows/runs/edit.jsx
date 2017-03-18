import React, {Component} from 'react';
import {Button, Form} from 'semantic-ui-react';
import {inject, observer} from 'mobx-react';
import {observable, computed} from 'mobx';
import DogSelect from '../dogs/dogSelect';
import Run from 'store/models/run';
import {createViewModel} from 'mobx-utils';

@inject('dogs', 'runs')
@observer
class EditRun extends Component {

	@observable run;
	@observable formLoading = false;
	@computed get createMode(){
		return (this.run.id ? false : true);
	}

	constructor(props){
		super(props);
		this.state = {open: false};
		this.run = new Run({showId: this.props.params.id});
	}

	toggleOpen = () => {
		this.setState({'open': !this.state.open});
	};

	onChange = (e) => {
		this.run[e.target.name] = e.target.value;
	};

	onSelectChange = (e, selectedItem) => {
		this.run[selectedItem.name] = selectedItem.value;
	};

	onSubmit = (e, data) => {
		e.preventDefault();
		this.formLoading = true;
		this.run.save()
			.then(id => this.formLoading = false);
	};

	render(){
		const typeOptions = [
			{key: 'agility', text: 'Agility', value: 'agility'},
			{key: 'jumping', text: 'Jumping', value: 'jumping'},
			{key: 'special', text: 'Special', value: 'special'}
		];
		const gradeTypeOptions = [
			{key: 'graded', text: 'Graded', value: 'graded'},
			{key: 'combined', text: 'Combined', value: 'combined'}
		];

		return (
			<div>
				<p>Add a run here, etc {this.run.clear ? 'clear' : 'faults'}</p>
				<Form onSubmit={this.onSubmit} loading={this.formLoading}>
					<Form.Group widths="equal">
						<Form.Field>
							<label>
								Class grade
								<input type="text" name="grade" placeholder="e.g. 1-3" value={this.run.grade} onChange={this.onChange}/>
							</label>
						</Form.Field>
						<Form.Input label="Grade at the time" placeholder="When you did this run, what grade were you?" name="currentGrade" value={this.run.currentGrade} onChange={this.onChange} />
					</Form.Group>
					<Form.Field>
						<DogSelect name="dogId" value={this.run.dogId} onChange={this.onSelectChange}/>
					</Form.Field>
					<Form.Group widths="equal">
						<Form.Field>
							<label>
								What place did you get? (leave blank if you did not place)
								<input type="text" name="place" placeholder="e.g. 1" value={this.run.place} onChange={this.onChange}/>
							</label>
						</Form.Field>
						<Form.Field>
							<label>
								How many faults did you get? (leave blank if you were clear!)
								<input type="number" min="0" step="0.001" name="faults" placeholder="Faults" value={this.run.faults} onChange={this.onChange}/>
							</label>
						</Form.Field>
					</Form.Group>
					<Form.Group widths="equal">
						<Form.Input label="Running Order" placeholder="Which number are you?" name="runningOrder" value={this.run.runningOrder} onChange={this.onChange} />
						<Form.Input label="Ring Number" placeholder="Which ring is it in?" name="ringNumber" value={this.run.ringNumber} onChange={this.onChange} />
					</Form.Group>
					<Form.Group widths="equal">
						<Form.Field>
							<label>
								Class size
								<input type="number" min="0" name="classSize" placeholder="How large was the class" value={this.run.classSize} onChange={this.onChange}/>
							</label>
						</Form.Field>
						<Form.Input label="Judge" placeholder="Who was the judge" name="judge" value={this.run.judge} onChange={this.onChange} />
					</Form.Group>
					<Form.Group widths="equal">
						<Form.Select label="Type" placeholder="Type of class" options={typeOptions} value={this.run.type} name="type" onChange={this.onSelectChange} />
						<Form.Field>
							<label>
								Course length
								<input type="number" min="0" name="courseLength" placeholder="The length of the course" value={this.run.courseLength} onChange={this.onChange}/>
							</label>
						</Form.Field>
					</Form.Group>
					<Form.Group widths="equal">
						<Form.Select label="Graded or combined" options={gradeTypeOptions} name="gradeType" value={this.run.gradeType} onChange={this.onSelectChange} />
						<Form.Field>
							<label>
								Class number
								<input type="number" min="1" name="classNumber" value={this.run.classNumber} onChange={this.onChange} placeholder="Class number" />
							</label>
						</Form.Field>
					</Form.Group>
					<Form.Group widths="equal">
						<Form.Field>
							<label>
								Course time
								<input type="number" min="0" step="0.001" name="courseTime" placeholder="Course time" value={this.run.courseTime} onChange={this.onChange}/>
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
