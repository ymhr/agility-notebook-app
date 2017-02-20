import {Form} from 'semantic-ui-react';
import React from 'react';

export default ({dogs}) => {

	const options = dogs.map(d => {
		return {
			key: d.id,
			text: d.name,
			value: d.id
		};
	});

	return (
		<div>
			<Form.Select label="Dog" name="dog" options={options} placeholder="Please select a dog" />
		</div>
	);
};