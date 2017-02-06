import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {Segment, Loader} from 'semantic-ui-react';
import DogExpando from '../dogs/dogExpando';

import './style.scss';

@observer
class Run extends Component {

	render(){
		const {run, show} = this.props;

		const placed = (run.place !== null && run.place > 0) ? <div className="place"><span>{run.place}</span></div> : '';

		const dogInfo = (run.dog) ? <DogExpando dog={run.dog} /> : <Loader active />;

		return (
			<Segment clearing>
				<h3><span style={{color:'#ddd'}}>{run.order + 1}.</span> {run.grade}</h3>
				<p>{run.notes}</p>
				{dogInfo}
				{placed}
			</Segment>
		);

	}

}

export default Run;