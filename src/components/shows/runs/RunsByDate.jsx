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
		// const items = dogs.map((r) => <RunByDog runs={runs} />);
		const items = map(dogs, (r, dogId) => <RunsByDog key={date + dogId} runs={r} />);

		date = moment(date);

		return (
			<div>
				<Divider horizontal>{date.toString()}</Divider>
				{items}
			</div>
		);

	}

}

export default RunsByDate;