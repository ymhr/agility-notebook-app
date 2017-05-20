import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {Form, Grid} from 'semantic-ui-react';
import ManageHandlers from './manageHandlers';

@inject('handlers')
@observer
class SelectHandler extends Component {

	render(){
		
		const {name, value, onChange} = this.props;

		const options = this.props.handlers.items
			.sort((a,b) => a.name > b.name)
			.map(d => {
				return {
					key: d.id,
					text: d.name,
					value: d.id
				};
			});
		
		const hasHandlers = !!this.props.handlers.items.length;

		let selectWidth = 13;
		let buttonWidth = 3;

		if(!hasHandlers) buttonWidth = 16;

		const hideSelectStyle = {display: (hasHandlers) ? 'block' : 'none'};

		return (
			<div>
				<Grid>
					<Grid.Column width={selectWidth} style={hideSelectStyle}>
						<Form.Select label="Handler" name={name} options={options} placeholder="Please select a handler" value={value} onChange={onChange} />
					</Grid.Column>
					<Grid.Column width={buttonWidth} verticalAlign="bottom">
						<ManageHandlers hasHandlers={hasHandlers}/>
					</Grid.Column>
				</Grid>
			</div>
		);
	}

}

export default SelectHandler;