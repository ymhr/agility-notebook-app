import React, {Component} from 'react';
import {Modal, Button, Form} from 'semantic-ui-react';
import {inject, observer} from 'mobx-react';
import DogSelect from '../dogs/dogSelect';

@inject('dogs')
@observer
class AddRunModal extends Component {

	constructor(props){
		super(props);
		this.state = {open: false};
	}

	toggleOpen = () => {
		this.setState({'open': !this.state.open});
	};

	render(){

		return (
			<div>
				<Button onClick={this.toggleOpen}>Add Run</Button>
				<Modal open={this.state.open}>
					<Modal.Header>Add a run</Modal.Header>
					<Modal.Content>
						<Modal.Description>
							<p>Add a run here, etc</p>
							<Form>
								<Form.Field>
									<label>
										Class grade
										<input type="text" name="grade" placeholder="e.g. 1-3"/>
									</label>
								</Form.Field>
								<Form.Field>
									<DogSelect dogs={this.props.dogs.items} />
								</Form.Field>
								<Form.Field>
									<label>
										What place did you get? (leave blank if you did not place)
										<input type="text" name="place" placeholder="e.g. 1"/>
									</label>
								</Form.Field>
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