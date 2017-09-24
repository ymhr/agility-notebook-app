import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {Divider, Grid} from 'semantic-ui-react';
import {map} from 'lodash';

import Run from './run';
import moment from "moment";
import RunsByDog from './RunsByDog';

@inject('dogs', 'shows')
@observer
class RunsByDate extends Component {

	render(){

		const {dogs} = this.props;
		let {date} = this.props;

		const items = map(dogs, (r, dogId) => <RunsByDog key={date + dogId} runs={r} />);

		date = moment(date);

		return (
			<div>
				<Divider horizontal style={{'backgroundColor': '#fff'}}>{date.format('dddd Do MMMM')}</Divider>
				{items}
			</div>
		);

	}

}

export default RunsByDate;