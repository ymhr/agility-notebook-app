import React, {Component} from 'react';
import {Modal, Button, Form} from 'semantic-ui-react';
import {inject, observer} from 'mobx-react';
import {observable} from 'mobx';
import DogSelect from '../dogs/dogSelect';
import Run from 'store/models/run';
import {createViewModel} from 'mobx-utils';

@inject('dogs')
@observer
class AddRunModal extends Component {

	@observable vm;
	@observable run;

	constructor(props){
		super(props);
		this.state = {open: false};
		this.run = new Run({});
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

	render(){
		return (
			<div>
				<Button onClick={this.toggleOpen}>Add Run</Button>
				<Modal open={this.state.open}>
					<Modal.Header>Add a run</Modal.Header>
					<Modal.Content>
						<Modal.Description>
							<p>Add a run here, etc {this.run.clear ? 'clear' : 'faults'}</p>
							<Form>
								<Form.Field>
									<label>
										Class grade
										<input type="text" name="grade" placeholder="e.g. 1-3" value={this.run.grade} onChange={this.onChange}/>
									</label>
								</Form.Field>
								<Form.Field>
									<DogSelect name="dogId" value={this.run.dogId} onChange={this.onSelectChange}/>
								</Form.Field>
								<Form.Field>
									<label>
										What place did you get? (leave blank if you did not place)
										<input type="text" name="place" placeholder="e.g. 1" value={this.run.place} onChange={this.onChange}/>
									</label>
								</Form.Field>
								<Form.Field>
									<label>
										How many faults did you get? (leave blank if you were clear!)
										<input type="number" step="0.001" name="faults" placeholder="Faults" value={this.run.faults} onChange={this.onChange}/>
									</label>
								</Form.Field>
								<Form.Group widths="equal">
									<Form.Input label="Running Order" placeholder="Which number are you?" name="runningOrder" value={this.run.runningOrder} />
									<Form.Input label="Ring Number" placeholder="Which ring is it in?" name="ringNumber" value={this.run.ringNumber} />
								</Form.Group>
							</Form>
						</Modal.Description>
					</Modal.Content>
					<Modal.Actions>
						<Button color="red" onClick={this.toggleOpen}>Cancel</Button>
						<Button color="green">Add</Button>
					</Modal.Actions>
				</Modal>
			</div>
		);

	}

}

export default AddRunModal;
