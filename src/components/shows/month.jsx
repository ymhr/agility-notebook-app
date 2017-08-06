import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import Show from './show/show';
import moment from 'moment';
import {List, Icon} from 'semantic-ui-react';
import PropTypes from 'prop-types';

@inject('settings')
@observer
class Month extends Component {

	month;	

	constructor(props){
		super(props);

		//Break apart our weirdly formatted date into something we can use
		this.month = moment(this.props.month, '0YYYYMM');

		if(this.props.settings.collapseOldMonths) {

			//Whether the current month is in the past or not
			const hasPassed = this.month.isBefore(moment(moment().format('YYYYMM'), 'YYYYMM'));	

			this.state = {open: !hasPassed};
		} else {
			this.state = {open: true};
		}
	}

	toggleOpen = () => {
		this.setState({open: !this.state.open})
	};

	openIndicator = () => {
		const iconName = this.state.open ? 'chevron up' : 'chevron down';
		return (
			<div style={{float: "right"}}><Icon name={iconName} /></div>
		);
	};

	render() {
		const {shows} = this.props;

		const showList = shows.map(s => {
			return <Show key={s.id} show={s}/>;
		});

		const styles = {
			monthTitle: {
				"backgroundColor": "#eee",
				padding: "5px",
				margin: "0px"
			},
			showList: {
				"margin-bottom": "5px"
			},
			monthHeading: {
				cursor: "pointer"
			}
		};

		const content = showList.length ? (
			<div className="showList">
				<List divided selection>
					{showList}
				</List>
			</div>
		)  : (
			<div></div>
		);

		return (
			<div className="month-list" style={styles.monthHeading} onClick={this.toggleOpen}>
				{this.openIndicator()}
				<h3 style={styles.monthTitle}>{this.month.format('MMMM YYYY')}</h3>
				{this.state.open && content}
			</div>
		)
	}

}

Month.propTypes = {
	month: PropTypes.string.isRequired,
	shows: PropTypes.array
};

export default Month;
