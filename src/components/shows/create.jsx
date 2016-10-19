import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {createViewModel} from 'mobx-utils';
import {Form, Button} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import Show from '../../store/show';
import moment from 'moment';


@observer(['shows'])
class Create extends Component {

	show = {};

    constructor(props){
        super(props);
    }

    onSubmit = (e, data) => {
        console.log(data);
    };

    onChange = (e) => {
        this.show[e.target.name] = e.target.value;
    };

    setDate = (type='startDate', date) => {
        this.show[type] = date;
		console.log(this.show);
    }

    render(){
        return(

            <div>
                <h3>Add Show</h3>
                <Form onSubmit={this.onSubmit}>
                    <Form.Input name="name" placeholder="What is the name of the show?" onChange={this.onChange} value={this.show.name} />
                    <Form.Input name="name" placeholder="What is the name of the show?" onChange={this.onChange} value={this.show.name} />
                    <DatePicker placeholder="Start date" onChange={this.setDate.bind(this, 'startDate')} value={this.show.startDate}/>
                    <DatePicker placeholder="End date" onChange={this.setDate.bind(this, 'endDate')} value={this.show.endDate}/>
                </Form>
            </div>

        )
    }
}

export default Create;
