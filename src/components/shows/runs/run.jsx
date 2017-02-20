import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {Segment, Loader} from 'semantic-ui-react';
import DogExpando from '../dogs/dogExpando';

import './style.scss';

@observer
class Run extends Component {

	render(){
		const {run, show} = this.props;

		const results = (run.clear ? <strong>Clear!</strong> : <span className="faults"><em>{run.faults} faults</em></span>);

		const placed = (run.place !== null && run.place > 0) ? <div className="place"><span>{run.place}</span></div> : '';

		const dogInfo = (run.dog) ? <DogExpando dog={run.dog} className="dogRunning" /> : <Loader active />;


		return (
			<Segment clearing>
				<h3><span style={{color:'#ddd'}}>Run #{run.order + 1}</span><br />Grade {run.grade}</h3>
				Who ran: {dogInfo}
				<h4>Your result: {results}</h4>

				<p>{run.notes}</p>
				{placed}
			</Segment>
		);

	}

}

export default Run;