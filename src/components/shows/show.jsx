import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Header} from 'semantic-ui-react';
import moment from 'moment';

@observer
class Show extends Component {
	render() {

		const show = this.props.show;

		return (

			<div>
				<Header as="h4">
					{show.name}
					<Header.Subheader>{moment(show.startDate).format('dddd, MMMM Do YYYY')} - {moment(show.endDate).format('dddd, MMMM Do YYYY')}</Header.Subheader>
				</Header>
			</div>

		);

	}
}

export default Show;