import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {action} from 'mobx';

import styles from './style.css';
console.log(styles)

@inject('shows')
@observer
export default class YearFilters extends Component {

	@action
	setFilter = (year) => {
		this.props.shows.yearFilter = year;
	};

	render(){
		const {yearFilter} = this.props.shows;

		const years = this.props.shows.availableYears.map(y => {
			return (
				<div className={parseInt(y) === parseInt(yearFilter) ? styles.active : styles.year} key={Math.random()} onClick={this.setFilter.bind(null, y)}>
					{y}
				</div>
			);
		});
		return (
			<div className={styles.yearFilters}>
				{years}
			</div>
		);
	}
}