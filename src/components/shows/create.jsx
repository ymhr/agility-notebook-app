import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {createViewModel} from 'mobx-utils';
import {Form, Button} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import Show from '../../store/show';
import {hashHistory} from 'react-router';
import moment from 'moment';


@observer(['shows', 'auth'])
class Create extends Component {

    show;
	vm;
	formLoading = false;

    constructor(props){
        super(props);
        this.show = new Show({});
        this.vm = createViewModel(this.show);
		this.vm.startDate = moment();
		this.vm.endDate = moment();
    }

    onSubmit = (e, data) => {
    	e.preventDefault();
        const {auth} = this.props;
		this.formLoading = true;

		auth.post('/shows', data)
			.then(res => {
				console.log('success', res);
				this.vm.submit();
				this.props.shows.items.push(new Show(res.data.data));
				this.formLoading = false;
				hashHistory.push('/');
			})
			.catch(err => {
				console.error('error', err);
				this.formLoading = false;
			});
    };

    onChange = (e) => {
        this.vm[e.target.name] = e.target.value;
    };

    setDate = (type='startDate', date) => {
        this.vm[type] = date;
		console.log(this.vm);
    };

    render(){
        return(

            <div>
                <h3>Add Show</h3>
                <Form onSubmit={this.onSubmit} loading={this.formLoading}>
                    <Form.Field>
                        <label htmlFor="name">Name</label>
                        <Form.Input name="name" placeholder="What is the name of the show?" onChange={this.onChange} value={this.vm.name} />
                    </Form.Field>
					<Form.Field>
						<label htmlFor="postcode">Postcode</label>
						<Form.Input name="postcode" placeholder="Where was the show?" onChange={this.onChange} value={this.vm.postcode} />
					</Form.Field>
					<Form.Field>
						<label htmlFor="notes">Notes</label>
						<Form.TextArea name="notes" placeholder="Do you have any notes for this show?" onChange={this.onChange} value={this.vm.notes} />
					</Form.Field>
                    <Form.Field>
                        <label htmlFor="startDate">Start date</label>
                        <DatePicker name="startDate" placeholder="Start date" dateFormat="DD-MM-YYYY" maxDate={this.vm.endDate} onChange={this.setDate.bind(this, 'startDate')} selected={this.vm.startDate}/>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="endDate">Start date</label>
                        <DatePicker name="endDate" placeholder="End date" dateFormat="DD-MM-YYYY" minDate={this.vm.startDate} onChange={this.setDate.bind(this, 'endDate')} selected={this.vm.endDate}/>
                    </Form.Field>
                    <Button primary>Add show</Button>
                </Form>
            </div>

        )
    }
}

export default Create;
