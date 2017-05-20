import {Form} from 'semantic-ui-react';
import React from 'react';
import {observer, inject} from 'mobx-react';

export default inject('dogs')(observer(({dogs, value, onChange, name}) => {

	const options = dogs.items
		.filter(d => !d.notForCompetition)
		.map(d => {
			return {
				key: d.id,
				text: d.name,
				value: d.id
			};
		});

	return (
		<div>
			<Form.Select label="Dog" name={name} options={options} placeholder="Please select a dog" value={value} onChange={onChange} />
		</div>
	);
}));
