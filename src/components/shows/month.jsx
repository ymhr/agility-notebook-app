import React, {Component} from 'react';
import {observer} from 'mobx-react';
import Show from './show';
import moment from 'moment';
import {List} from 'semantic-ui-react';

@observer
class Month extends Component {

	month;

	render() {
		const {shows} = this.props;

		//Break apart our weirdly formatted date into something we can use
		this.month = moment(this.props.month, '0YYYYMM');

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
			<div className="month-list">
				<h3 style={styles.monthTitle}>{this.month.format('MMMM YYYY')}</h3>
				{content}
			</div>
		)
	}

}

Month.propTypes = {
	month: React.PropTypes.string.isRequired,
	shows: React.PropTypes.array
};

export default Month;
