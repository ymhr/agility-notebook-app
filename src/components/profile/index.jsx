import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {createViewModel} from 'mobx-utils';
import {Form, Button} from 'semantic-ui-react';

@observer(['profile'])
class Profile extends Component {

    constructor(props){
        super();
        this.vm = createViewModel(props.profile);
    }

    submitForm = (e, data) => {
        e.preventDefault();
        this.vm.submit();
        this.props.profile.persistData();
    };

    onChange = (e) => {
        this.vm[e.target.name] = e.target.value;
    };

    render(){
        return (
            <div>
                <h1>Profile</h1>
                <Form onSubmit={this.submitForm}>
                    <Form.Input label="First name" name="firstName" placeholder="What's your first name?" value={this.vm.firstName} onChange={this.onChange} />
                    <Form.Input label="Last name" name="lastName" placeholder="What's your last name?" value={this.vm.lastName} onChange={this.onChange} />
                    <Form.Input label="Age" name="age" placeholder="How old are you?" value={this.vm.age} onChange={this.onChange} />
                    <Button type="submit" disabled={!this.vm.isDirty}>Submit</Button>
                </Form>
            </div>
        )
    }
}

export default Profile;
