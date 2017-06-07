import React, {Component} from 'react';
import {Popup} from 'semantic-ui-react';

import styles from './style.css';

class Rosette extends Component {

	render(){
		const {run} = this.props;

		const placeClasses = [];
		let popupContent = 'Clear round!';

		if((run.place !== null && run.place > 0)) {
			placeClasses.push(styles.place);

			switch(parseInt(run.place)) {
				case 1:
					placeClasses.push(styles.placeFirst);
					popupContent = 'First place!';
					break;
				case 2:
					placeClasses.push(styles.placSecond);
					popupContent = 'Second place!';
					break;
				case 3:
					placeClasses.push(styles.placeThird);
					popupContent = 'Third place!';
					break;
			}
		}

		let rosette = (run.place !== null && run.place > 0) ? <div className={placeClasses.join(' ')}><span>{run.place}</span></div> : null;

		rosette = (!rosette && run.clear) ? <div className={[styles.place, styles.placeClear].join(' ')}><span>C</span></div> : rosette;


		return (
			<Popup
				trigger={rosette}
				content={popupContent}
			/>
		);
	}

}
export default Rosette