import React, {Component} from 'react';
import {observable} from 'mobx';
import {observer, inject} from 'mobx-react';
import {createViewModel} from 'mobx-utils';
import {Form, Button, Select} from 'semantic-ui-react';
import {hashHistory} from 'react-router';
import Dog from 'store/models/dog';
import {resolve} from 'react-resolver';

@inject('profile', 'dogs', 'auth')
@observer
class Edit extends Component {

    dog;
    @observable vm;
    @observable loading = false;
    createMode = false;

    constructor(props){
        super(props);
    }

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
        this.props.dogs.get(id || this.props.params.id)
            .then(d => {
                this.dog = new Dog(d);
        		this.createVm();
            })
            .catch(err => {
                console.error('Failed to load dog with id', id || this.props.params.id);
				this.dog = new Dog({});
				this.createMode = true;
				this.createVm();
            });
    }

	createVm = () => {
		this.vm = createViewModel(this.dog);
		this.loading = false;
	}

    onChange = (e) => {
        this.vm[e.target.name] = e.target.value;
    };

    save = (e) => {
        e.preventDefault();

        this.loading = true;

        if(this.createMode){
            this.loading = false;
        } else {
            this.dogs.update(id)
                .then((res) => {
                    this.loading = false;
                });
        }

    }

    render(){

        const sizeOptions = [
            {text: 'Small', value: 'small'}, {text: 'Medium', value: 'medium'}, {text: 'Large', value: 'large'}
        ];

        return(

            <div>

                <Form loading={this.loading} onSubmit={this.save}>
                    <Form.Input label="Name" name="name" placeholder="What is your dogs name?" value={this.vm.name} onChange={this.onChange} />
                    <Form.Input label="Registered Name" name="officialName" placeholder="What is your dogs KC name?" value={this.vm.officialName} onChange={this.onChange} />
                    <Form.Input type="number" label="Grade" name="grade" placeholder="What grade is your dog?" value={this.vm.grade} onChange={this.onChange} />
                    <Form.Input label="Breed" name="breed" placeholder="What breed is your dog?" value={this.vm.breed} onChange={this.onChange} />
                    <Select label="Size" name="size" placeholder="What size does your dog jump" options={sizeOptions} defaultValue={this.vm.size} onChange={this.onChange} />
                    <Button type="submit">Submit</Button>
                </Form>

            </div>

        );
    }

}

export default Edit;
