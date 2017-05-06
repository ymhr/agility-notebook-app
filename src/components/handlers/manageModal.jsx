import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {Modal} from 'semantic-ui-react';
import Manage from './manage';

@observer
class ManageModal extends Component {

	render(){
		return (
			<Modal {...this.props}>
				<Modal.Header><h2>Manage Handlers</h2></Modal.Header>
				<Modal.Content>
					<Manage />
				</Modal.Content>
			</Modal>
		);
	}

}

export default ManageModal;