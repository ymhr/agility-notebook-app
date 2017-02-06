import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Form, Button} from 'semantic-ui-react';
import {hashHistory} from 'react-router';
import Dog from '../../store/models/dog';

@observer(['profile'])
class Create extends Component {

    addNewDog = (e, data) => {
        e.preventDefault();

        const dog = new Dog({
            ...data,
            userId: this.props.profile.userId
        });

        dog.persistData();

        hashHistory.push('/dogs');
    };

    render(){
        const sizeOptions = [
            {text: 'Small', value: 'small'}, {text: 'Medium', value: 'medium'}, {text: 'Large', value: 'large'}
        ];
        return(

            <div>

                <Form onSubmit={this.addNewDog}>
                    <Form.Input label="Name" name="name" placeholder="What is your dogs name?" />
                    <Form.Input label="Registered Name" name="officialName" placeholder="What is your dogs KC name?" />
                    <Form.Input type="number" label="Grade" name="grade" placeholder="What grade is your dog?" defaultValue={1} />
                    <Form.Input label="Breed" name="breed" placeholder="What breed is your dog?" />
                    <Form.Select label="Size" name="size" placeholder="What size does your dog jump" options={sizeOptions} />
                    <Button type="submit">Submit</Button>
                </Form>

            </div>

        );
    }

}

export default Create;
