import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Checkbox} from 'semantic-ui-react';
import {map} from 'lodash';

import './style.css';

@inject('settings')
@observer
class Index extends Component {

	getSettingsList() {
		return {
			showEmptyMonths: {
				label: 'Show Empty Months'
			}
		}
	};

	changeSetting = (e, data) => {
		console.log(data);
		this.props.settings.update(data.name, data.checked);
	};

	render() {

		const {settings} = this.props;

		if (this.props.settings.loaded === false) {
			return <h2>Loading...</h2>;
		}

		let settingsList = this.getSettingsList();

		settingsList = map(settingsList, (setting, name) => {
			return (
				<tr key={name}>
					<td>{setting.label}</td>
					<td><Checkbox toggle name={name} checked={settings[name]} onChange={this.changeSetting}/></td>
				</tr>
			)
		});

		return (
			<div>
				<h1>Settings</h1>
				<table className="settings-list">
					<tbody>
						{settingsList}
					</tbody>
				</table>
				{/*Show Empty Months: <Checkbox toggle checked={settings.showEmptyMonths} />*/}
			</div>
		);
	}

}

export default Index;
