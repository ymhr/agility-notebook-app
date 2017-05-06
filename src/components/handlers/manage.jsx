import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {List, Button, Icon, Form} from 'semantic-ui-react';

import Handler from './handler';

@inject('handlers')
@observer
class Manage extends Component {

	constructor(props){
		super(props);
		this.state = {showAddForm: false};
	}

	toggleAddForm = () => {
		this.setState({showAddForm: !this.state.showAddForm});
	};

	addNewHandler = (e) => {
		e.preventDefault();
		const handler = this.props.handlers.createModelInstance({name: this.state.name});
		handler.save();
		this.toggleAddForm();

	};

	onChange = (e, {name, value}) => this.setState({[name]: value});

	render(){

		const handlers = this.props.handlers.items.map(h => <Handler key={h.id} handler={h} />);

		return(
			<div>
				<Button fluid basic onClick={this.toggleAddForm}><Icon name="add"/>Add handler</Button>
				<div style={{display: (this.state.showAddForm ? 'block' : 'none')}}>
					<Form onSubmit={this.addNewHandler}>
						<p>Add a new handler</p>
						<Form.Group inline>
							<Form.Input name="name" placeholder="Enter the handler's name" onChange={this.onChange} />
							<Button basic color="green"> Save</Button>
						</Form.Group>
					</Form>
				</div>
				<List selection>
					{handlers}
				</List>
			</div>
		);
	}
}

export default Manage;

