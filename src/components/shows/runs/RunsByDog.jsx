import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {Divider, Grid} from 'semantic-ui-react';
import {StickyContainer, Sticky} from 'react-sticky';

import Run from './run';
import {hashHistory} from "react-router";

@inject('dogs', 'shows')
@observer
class RunsByDog extends Component {


	editButtonClickHandler = (showId, id) => {
		hashHistory.push(`shows/${showId}/run/${id}`)
	};


	render(){

		const {runs} = this.props;

		const items = runs.map((r) => <Grid.Column mobile={16} tablet={8} computer={4} key={r.id}><Run run={r} editButtonClickHandler={this.editButtonClickHandler.bind(this, r.showId, r.id)} /></Grid.Column>);

		return (
			<StickyContainer>
				<Sticky className="sticky-headers" topOffset={30}><Divider horizontal clearing style={{'backgroundColor': '#fff'}}>{runs[0].dog.name}</Divider></Sticky>
				<Grid>
					{items}
				</Grid>
			</StickyContainer>
		);

	}

}

export default RunsByDog;