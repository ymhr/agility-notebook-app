import React, {Component} from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import {createViewModel} from 'mobx-utils';
import {Form, Button} from 'semantic-ui-react';
import {hashHistory} from 'react-router';
import Dog from '../../store/models/dog';

@observer(['profile', 'dogs'])
class Edit extends Component {

    dog;
    @observable vm;
    @observable loading = false;

    componentWillMount(){
        this.loadDog();
    }

    shouldComponentUpdate(nextProps){
        if(this.props.params.id !== nextProps.params.id)
        {
            this.loadDog(nextProps.params.id);
            return true;
        }

        return false;
    }

    loadDog = (id) => {
        this.loading = true;
        this.vm = {};
        this.props.dogs.getDog(id || this.props.params.id)
            .subscribe(
                dog => {
                    this.dog = new Dog(dog);
                    this.vm = createViewModel(this.dog);
                    this.loading = false;
                }
            );
    }

    onChange = (e) => {
        this.vm[e.target.name] = e.target.value;
    };

    saveEdit = (e) => {
        e.preventDefault();
        this.vm.submit();
        this.dog.persistData();
    }

    render(){

        const sizeOptions = [
            {text: 'Small', value: 'small'}, {text: 'Medium', value: 'medium'}, {text: 'Large', value: 'large'}
        ];

        return(

            <div>

                <Form loading={this.loading} onSubmit={this.saveEdit}>
                    <Form.Input label="Name" name="name" placeholder="What is your dogs name?" value={this.vm.name} onChange={this.onChange} />
                    <Form.Input label="Registered Name" name="officialName" placeholder="What is your dogs KC name?" value={this.vm.officialName} onChange={this.onChange} />
                    <Form.Input type="number" label="Grade" name="grade" placeholder="What grade is your dog?" value={this.vm.grade} onChange={this.onChange} />
                    <Form.Input label="Breed" name="breed" placeholder="What breed is your dog?" value={this.vm.breed} onChange={this.onChange} />
                    <Form.Select label="Size" name="size" placeholder="What size does your dog jump" options={sizeOptions} value={this.vm.size} onChange={this.onChange} />
                    <Button type="submit">Submit</Button>
                </Form>

            </div>

        );
    }

}

export default Edit;
