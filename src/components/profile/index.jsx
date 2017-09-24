import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {createViewModel} from 'mobx-utils';
import {Form, Button} from 'semantic-ui-react';

@inject('profile')
@observer
class Profile extends Component {

	constructor(props) {
		super();
		this.vm = createViewModel(props.profile);
	}

	submitForm = (e, data) => {
		e.preventDefault();
		this.vm.submit();
		// this.props.profile.persistData();
	};

	onChange = (e) => {
		this.vm[e.target.name] = e.target.value;
	};

	render() {
		return (
			<div>
				<h1>Profile</h1>
				<p>{this.props.profile.fullName}</p>
				<Form onSubmit={this.submitForm}>
					<Form.Input label="First name" name="firstName" placeholder="What's your first name?"
								defaultValue={this.vm.firstName} onChange={this.onChange}/>
					<Form.Input label="Last name" name="lastName" placeholder="What's your last name?"
								defaultValue={this.vm.lastName} onChange={this.onChange}/>
					<Button type="submit" disabled={!this.vm.isDirty}>Submit</Button>
				</Form>
			</div>
		)
	}
}

export default Profile;
