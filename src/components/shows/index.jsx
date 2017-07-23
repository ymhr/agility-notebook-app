import React, {Component} from 'react';
import {observer} from 'mobx-react';
import Month from './month';
import {Button, Icon, List} from 'semantic-ui-react';
import {hashHistory} from 'react-router';
import {each, padStart, map} from 'lodash';
import moment from 'moment';
import GiantButton from 'components/general/giantButton';

@observer(['shows', 'settings'])
class Shows extends Component {

	componentWillMount() {
		this.props.shows.load();
		this.generateMonthNumber = this.generateMonthNumber.bind(this);
	}

	openCreate = () => {
		hashHistory.push('/shows/add');
	};

	generateMonthList = (shows, addEmptyMonths = true) => {
		let firstMonth, lastMonth;

		const months = {};

		if (shows.length) {
			firstMonth = moment(shows[0].startDate);
			lastMonth = moment(shows[shows.length - 1].startDate);

			const duration = moment.duration(lastMonth.diff(firstMonth));

			const index = this.generateMonthNumber(firstMonth);

			months[index] = [];

			if (addEmptyMonths) {
				for (let i = 0; i < Math.round(duration.asMonths()); i++) {
					firstMonth.add(1, 'M');
					const tempIndex = this.generateMonthNumber(firstMonth);
					months[tempIndex] = [];
				}
				months[this.generateMonthNumber(lastMonth)] = [];
			} else {
				each(shows, s => {
					months[this.generateMonthNumber(moment(s.startDate))] = [];
				})
			}

			return months;

		}

	};

	generateMonthNumber(date) {

		if (!moment.isMoment)
			date = moment(date);

		return 0 + '' + date.year() + '' + padStart((date.month() + 1), 2, '0');
	};

	insertShowsIntoMonthList = (shows, showEmptyMonths = true) => {
		const monthList = this.generateMonthList(shows, showEmptyMonths);

		each(shows, show => {
			const monthIndex = this.generateMonthNumber(moment(show.startDate));
			monthList[monthIndex].push(show);
		});

		return monthList;

	};

	addButton = () => {
		if(this.props.shows.items.length) {
			return <Button fluid content="Add show" icon="plus" onClick={this.openCreate}/>
		} else {
			return <GiantButton
				title="Add a new show"
				icon="plus"
				description="Click this button to add a new show. You can then add new runs to it!"
				onClick={this.openCreate}
				/>
		}
	};

	render() {

		let content = this.props.children;

		const monthList = this.insertShowsIntoMonthList(this.props.shows.items, this.props.settings.showEmptyMonths);

		const itemList = map(monthList, (m, month) => {
			return <Month key={month} shows={m} month={month}/>
		});

		

		if (!this.props.children) {
			content = (
				<div>
					{this.addButton()}
					<br />
					{itemList}
				</div>
			);
		}

		return (

			<div>
				{content}
			</div>

		);
	}

}

export default Shows;
