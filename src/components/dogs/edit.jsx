import React, {Component} from 'react';
import {observable} from 'mobx';
import {observer, inject} from 'mobx-react';
import {createViewModel} from 'mobx-utils';
import {Form, Button, Select, Loader} from 'semantic-ui-react';
import Dog from 'store/models/dog';
import {resolve} from 'react-resolver';
import SelectHandler from '../handlers/selectHandler';
import DatePicker from 'react-datepicker';


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
        if(this.props.match.params.id !== nextProps.match.params.id)
        {
            this.loadDog(nextProps.match.params.id);
            return true;
        }

        return false;
    }

    loadDog = (id) => {
        this.loading = true;
        // this.dog = {};
        this.props.dogs.get(id || this.props.match.params.id)
            .then(d => {
                this.loading = false;
                this.dog = d;
        		// this.createVm();
            })
            .catch(err => {
                console.error('Failed to load dog with id', id || this.props.match.params.id, err);
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

	onCheckboxChange = (e, data) => {
		this.dog[data.name] = data.checked;
	};

    save = (e, data) => {
        e.preventDefault();

        this.loading = true;

        if(this.createMode){
            this.dog.save()
                .then(res => {
                    this.loading = false;
                    this.props.history.push(`/dogs/${this.dog.id}/edit`);
                });

        } else {
            this.dog.save()
                .then((res) => {
                    this.loading = false;
                });
        }
    };

	setDate = (type = 'dateOfBirth', date) => {
		date.hour(11);
		this.dog[type] = date;
	};

    render(){

        if(!this.dog) return <Loader />;

        const sizeOptions = [
            {text: 'Small', value: 'small'}, {text: 'Medium', value: 'medium'}, {text: 'Large', value: 'large'}
        ];
        const sexOptions = [
            {text: 'Male', value: 'male'}, {text: 'Female', value: 'female'}
        ];

        return(

            <div>

                <Form loading={this.loading} onSubmit={this.save}>
                    <Form.Input label="Name" name="name" placeholder="What is your dogs name?" value={this.dog.name} onChange={this.onChange} />
                    <Form.Input label="Registered Name" name="officialName" placeholder="What is your dogs KC name?" value={this.dog.officialName} onChange={this.onChange} />
                    <Form.Input type="number" label="Grade" name="grade" placeholder="What grade is your dog?" value={this.dog.grade} onChange={this.onChange} />
                    <Form.Input label="Breed" name="breed" placeholder="What breed is your dog?" value={this.dog.breed} onChange={this.onChange} />
                    <Form.Select label="Height" name="height" placeholder="What size does your dog jump" options={sizeOptions} defaultValue={this.dog.height} onChange={this.onSelectChange} />
                    <Form.Checkbox label="Lower height" toggle checked={this.dog.lowerHeight} name="lowerHeight" onChange={this.onCheckboxChange}/>
                    <Form.Select label="Sex" name="sex" placeholder="What is the sex of your dog" options={sexOptions} defaultValue={this.dog.sex} onChange={this.onSelectChange} />
                    <Form.Field>
                        <label>Date of birth</label>
                        <DatePicker name="dateOfBirth" placeholder="Date of birth"
                                    dateFormat="dddd Do MMMM, YYYY"
                                    onChange={this.setDate.bind(this, 'dateOfBirth')}
                                    selected={this.dog.dateOfBirth}
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                        />
                    </Form.Field>
                    <Form.Input label="KC Number" name="registeredNumber" placeholder="Registererd Number" value={this.dog.registeredNumber} onChange={this.onChange} />

                    <Form.Checkbox label="Not for competition" toggle checked={this.dog.notForCompetition} name="notForCompetition" onChange={this.onCheckboxChange}/>

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
