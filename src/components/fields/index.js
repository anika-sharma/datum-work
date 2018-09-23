import React from 'react';
import cx from 'classnames';

const getValidityClassName = meta => {
	if (meta.active) {
		return;
	}
	if (meta.touched && meta.invalid) {
		return 'invalid';
	}
	if (meta.touched && meta.valid) {
		return 'valid';
	}
}

export const customSelect = props => {
	const { label, meta, options } = props;
	return(
		<div
			className={cx(
				'custom-input-container',
				{ dirty: meta.dirty },
				getValidityClassName(meta)
			)}
		>
			<label>{props.label}</label>
			<select {...props.input}>
				<option />
				{options.map(value => 
					<option key={value.id} value={JSON.stringify(value)}>{value.name}</option>
				)}
			</select>
			{(meta.error && meta.touched) && (
				<div className="feedback-text error-text">{meta.error}</div>
			)}
		</div>
	)
}
