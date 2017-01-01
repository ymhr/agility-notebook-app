import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {List} from 'semantic-ui-react';
import {hashHistory} from 'react-router';
import moment from 'moment';

@observer
class Show extends Component {

	itemClick = (show) => {
		hashHistory.push(`/shows/${show.id}`);
	};

	render() {

		const {show} = this.props;

		return (

			<List.Item onClick={this.itemClick.bind(this, show)}>
				<List.Content>
					<List.Header>{show.name}</List.Header>
					<List.Description>{moment(show.startDate).format('dddd, MMMM Do YYYY')} - {moment(show.endDate).format('dddd, MMMM Do YYYY')}</List.Description>
				</List.Content>
			</List.Item>

		);

	}
}

export default Show;