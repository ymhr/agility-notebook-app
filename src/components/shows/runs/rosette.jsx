import React, {Component} from 'react';
import {Popup} from 'semantic-ui-react';

class Rosette extends Component {

	render(){
		const {run} = this.props;

		const placeClasses = [];
		let popupContent = 'Clear round!';

		if((run.place !== null && run.place > 0)) {
			placeClasses.push('place');

			switch(parseInt(run.place)) {
				case 1:
					placeClasses.push('place-first');
					popupContent = 'First place!';
					break;
				case 2:
					placeClasses.push('place-second');
					popupContent = 'Second place!';
					break;
				case 3:
					placeClasses.push('place-third');
					popupContent = 'Third place!';
					break;
			}
		}

		let rosette = (run.place !== null && run.place > 0) ? <div className={placeClasses.join(' ')}><span>{run.place}</span></div> : null;

		rosette = (!rosette && run.clear) ? <div className='place place-clear'><span>C</span></div> : rosette;


		return (
			<Popup
				trigger={rosette}
				content={popupContent}
			/>
		);
	}

}
export default Rosette