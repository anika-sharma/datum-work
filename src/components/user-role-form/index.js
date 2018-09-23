import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { customSelect } from '../fields';
import { required } from '../../validation';
import './index.css';

class UserRoleForm extends Component {
	componentDidUpdate(prevProps, prevState) {
		if(this.props.submitSucceeded) {
			//Reset form if props have been updated
			this.props.reset();
		}
	}

	render() {
		const { handleSubmit, notify } = this.props;

		return (
			<form onSubmit={handleSubmit} className="light-form">
				<h2>User Management Form</h2>
				<p>This form allows you to assign roles to a user within a given project. Each user can only only have one role per project. All fields are required.</p>
				<div className="form-field">
					<Field
						name="project" 
						component={customSelect}
						options={this.props.projects}
						label="Projects"
						validate={[required]}>
					</Field>
				</div>
				<div className="form-field">
					<Field 
						name="user" 
						component={customSelect}
						options={this.props.users}
						label="User"
						validate={[required]}>
					</Field>
				</div>
				<div className="form-field">
					<Field 
						name="role" 
						component={customSelect} 
						options={this.props.roles}
						label="Role"
						validate={[required]}>
					</Field>
				</div>
				<span className="notification-text">{notify}</span>				
				<button type="submit">Submit</button>
			</form>
		)
	}
}

UserRoleForm = reduxForm({
	form: 'userRole'
})(UserRoleForm);

export default UserRoleForm;
