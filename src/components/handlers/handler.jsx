import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {List, Popup, Form, Grid, Button} from 'semantic-ui-react';

@observer
class Handler extends Component {

	listItem = () => {
		const {handler} = this.props;

		return(
			<List.Item>
				<List.Content>
					<List.Header>
						{handler.name}
					</List.Header>
				</List.Content>
			</List.Item>
		);
	};

	editContent = () => {
		const {handler} = this.props;

		return (
			<div>
				<Form onSubmit={this.saveHandler}>
					<p>Change this handlers name</p>
					<Form.Group inline>
						<Form.Input name="name" defaultValue={handler.name} placeholder="Enter the handler's name" onChange={this.onChange} />
						<Button basic color="green"> Save</Button>
					</Form.Group>
				</Form>
			</div>
		);
	};

	onChange = (e, {name, value}) => {
		this.setState({[name]: value})
	};

	saveHandler = (e) => {
		const {handler} = this.props;
		e.preventDefault();
		if(this.state.name) {
			handler.name = this.state.name;
			handler.save();
		}
	};

	render(){
		return(
			<Popup
				on="click"
				content={this.editContent()}
				trigger={this.listItem()}
			/>
		);
	}

}

export default Handler;