import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {Segment, Loader, Button, Label, Icon} from 'semantic-ui-react';
import {isMoment} from 'moment';
import DogExpando from '../dogs/dogExpando';
import Rosette from './rosette';

import './style.scss';

@observer
class Run extends Component {

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

	expand = () => {
		this.props.run.expandToggle();
	};

	makeTitleCase = (text) => {
		return text.charAt(0).toUpperCase() + text.slice(1);
	};

	render(){
		const {run} = this.props;
		const {expanded} = run;

		if(run.loaded){

			let results = 'Faults';
			if(run.clear === 'clear') results = 'Clear!';
			else if (run.clear === 'Not run') results = false;

			const dogInfo = (run.dog) ? <DogExpando dog={run.dog} className="dogRunning" /> : <Loader active />;

			const day = (run.date) ? run.date.format('dddd Do') : '';

			const expandedContent = ( expanded ?
				<div>
					<Button basic size="mini" onClick={this.expand}><Icon name="chevron up" />Show less</Button>
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
				</div> : <Button basic size="mini" onClick={this.expand}><Icon name="chevron down" />Show more</Button>
			);

			const editButton = (
				<Button circular icon="edit" onClick={this.props.editButtonClickHandler} />
			);

			var date = (run.date ? run.date.format("dddd Do MMMM, YYYY") : '');

			var runTitle = [
				run.classNumber ? `Class #${run.classNumber} ` : null,
				run.type ? `${this.makeTitleCase(run.type)} ` : null,
				run.gradeType ? `${this.makeTitleCase(run.gradeType)} ` : null,
				run.grade ? `Grade ${run.grade}` : null
			].filter(item => item !== null).join(', ');

			const descriptionClass = (expanded ? 'description-limited' : '');

			return (
				<Segment clearing>
					<h3>
						{runTitle}
						{editButton}
					</h3>
					<h4>{date}</h4>
					<h4>{dogInfo} ran {run.currentGrade ? <span>at grade {run.currentGrade}</span> : ''}</h4>

					<p>{run.notes}</p>

					{expandedContent}

					<Rosette run={run} />

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
