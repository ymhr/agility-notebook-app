import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {Segment, Loader, Button, Label} from 'semantic-ui-react';
import DogExpando from '../dogs/dogExpando';

import './style.scss';

@observer
class Run extends Component {

	static state = {expanded: false};

	conditionallyAddDetails = (sectionTitle, values) => {
		const {run} = this.props;
		values = values
			.map(v => {
				return run[v.value] ?  <Label style={{marginBottom: 10}} key={Math.random()}><strong>{v.label}</strong> <Label.Detail>{run[v.value]}</Label.Detail></Label> : null;
			})
			.filter(v => v);

		if(values.length){
			return (
				<div>
					<h5>{sectionTitle}</h5>
					{values}
				</div>
			)
		}

		return null;

	};

	render(){
		const {run, show, expanded} = this.props;

		if(run.loaded){

			let results = 'Faults';
			if(run.clear === 'clear') results = 'Clear!';
			else if (run.clear === 'Not run') results = false;

			const placed = (run.place !== null && run.place > 0) ? <div className="place"><span>{run.place}</span></div> : '';

			const dogInfo = (run.dog) ? <DogExpando dog={run.dog} className="dogRunning" /> : <Loader active />;

			const day = (run.date) ? run.date.format('dddd do') : '';

			const expandedContent = (
				<div>
					{this.conditionallyAddDetails('Ring Details', [
						{value:'runningOrder', label: 'Running order'},
						{value:'ringNumber', label: 'Ring number'},
						{value:'classSize', label: 'Class Size'},
						{value:'judge', label: 'Judge'},
						{value:'type', label: 'Course type'},
						{value:'graded', label: 'Graded / Combined'},
						{value:'classNumber', label: 'Class number'},
						{value:'courseTime', label: 'Course time'}
					])}
					{this.conditionallyAddDetails('Your Run', [
						{value:'place', label: 'Your place'},
						{value:'currentGrade', label: 'Grade at the time'},
						{value:'runTime', label: 'Your time'}
					])}
				</div>
			);

			const editButton = (
				<Button circular icon="edit" onClick={this.props.editButtonClickHandler} />
			);

			return (
				<Segment clearing>
					{/*<h3>Grade {run.grade}, {day} {editButton}</h3>*/}
					<h3>
						{run.classNumber ? `Class #${run.classNumber}, ` : ''}
						{run.type ? `${run.type}, ` : ''}
						{run.gradeType ? `${run.gradeType}, ` : ''}
						{run.grade ? `${run.grade}` : ''}
					</h3>
					<h4>{dogInfo} ran {run.currentGrade ? <span>at grade {run.currentGrade}</span> : ''}</h4>

					<p>{run.notes}</p>

					{expandedContent}

					{placed}

				</Segment>
			);
		} else {
			return (
				<p>Loading</p>
			)
		}
	}

}

export default Run;
