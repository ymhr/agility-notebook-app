import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Button, Icon, Modal} from 'semantic-ui-react';
import ManageModal from './manageModal';

class ManageHandlers extends Component {

	render(){

		const {hasHandlers} = this.props;

		const buttonProps = {};
		if(!hasHandlers) buttonProps['fluid'] = 'fluid';

		return (
			<div>
				<ManageModal
					trigger={<Button onClick={(e) => e.preventDefault()} {...buttonProps}><Icon name="users" /> Edit handlers</Button>}
					closeIcon="close"
				/>
			</div>
		)

	}

}

export default ManageHandlers;