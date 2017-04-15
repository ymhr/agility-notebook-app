import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {List} from 'semantic-ui-react';
import {hashHistory} from 'react-router';
import moment from 'moment';

import './style.scss';

@observer
class Show extends Component {

	itemClick = (show) => {
		hashHistory.push(`/shows/${show.id}`);
	};

	render() {

		const {show} = this.props;

		const closingSoon = (show.closingSoon && !show.bookedIn ? <div className="showClosingSoon">Registration is ending in {show.closingDate.diff(moment(), 'days')} day(s)</div> : '');

		return (

			<List.Item onClick={this.itemClick.bind(this, show)}>
				<List.Content floated="right">Runs: {show.runs.length}</List.Content>
				<List.Content>
					<List.Header>{show.name}</List.Header>
					<List.Description>
						<div>{moment(show.startDate).format('dddd, MMMM Do YYYY')} - {moment(show.endDate).format('dddd, MMMM Do YYYY')}</div>
						{closingSoon}
					</List.Description>
				</List.Content>
			</List.Item>

		);

	}
}

Show.propTypes = {
	show: React.PropTypes.object.isRequired
};

export default Show;
