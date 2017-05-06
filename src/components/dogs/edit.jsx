import React, {Component} from 'react';
import {observable} from 'mobx';
import {observer, inject} from 'mobx-react';
import {createViewModel} from 'mobx-utils';
import {Form, Button, Select, Loader} from 'semantic-ui-react';
import {hashHistory} from 'react-router';
import Dog from 'store/models/dog';
import {resolve} from 'react-resolver';
import SelectHandler from '../handlers/selectHandler';


@inject('profile', 'dogs', 'auth')
@observer
class Edit extends Component {

    @observable dog;
    @observable vm;
    @observable loading = false;
    @observable createMode = false;

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
        // this.dog = {};
        this.props.dogs.get(id || this.props.params.id)
            .then(d => {
                this.loading = false;
                this.dog = d;
        		// this.createVm();
            })
            .catch(err => {
                console.error('Failed to load dog with id', id || this.props.params.id, err);
                this.loading = false;
				this.dog = new Dog({});
				this.createMode = true;
				// this.createVm();
            });
    }

    onChange = (e) => {
        this.dog[e.target.name] = e.target.value;
    };

    onSelectChange = (e, selectedItem) => {
        this.dog[selectedItem.name] = selectedItem.value;
    };

    save = (e, data) => {
        e.preventDefault();

        this.loading = true;

        if(this.createMode){
            this.dog.save()
                .then(res => {
                    this.loading = false;
                    hashHistory.push(`/dogs/${this.dog.id}/edit`);
                });

        } else {
            this.dog.save()
                .then((res) => {
                    this.loading = false;
                });
        }
    };

    render(){

        if(!this.dog) return <Loader />;

        const sizeOptions = [
            {text: 'Small', value: 'small'}, {text: 'Medium', value: 'medium'}, {text: 'Large', value: 'large'}
        ];

        return(

            <div>

                <Form loading={this.loading} onSubmit={this.save}>
                    <Form.Input label="Name" name="name" placeholder="What is your dogs name?" value={this.dog.name} onChange={this.onChange} />
                    <Form.Input label="Registered Name" name="officialName" placeholder="What is your dogs KC name?" value={this.dog.officialName} onChange={this.onChange} />
                    <Form.Input type="number" label="Grade" name="grade" placeholder="What grade is your dog?" value={this.dog.grade} onChange={this.onChange} />
                    {/*<Form.Input label="Breed" name="breed" placeholder="What breed is your dog?" value={this.dog.breed} onChange={this.onChange} />*/}
                    <Form.Select label="Height" name="height" placeholder="What size does your dog jump" options={sizeOptions} defaultValue={this.dog.height} onChange={this.onSelectChange} />
                    <Form.TextArea label="Notes" name="notes" placeholder="Notes" value={this.dog.notes} onChange={this.onChange} />
                    <SelectHandler name="handlerId" value={this.dog.handlerId} onChange={this.onSelectChange}/>
                    <br />
                    <Button type="submit">Submit</Button>
                </Form>

            </div>

        );
    }

}

export default Edit;
