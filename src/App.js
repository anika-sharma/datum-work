import React, { Component } from 'react';
import './App.css';
import UserRoleForm from './components/user-role-form';
import { Card } from './components/card';
import { Utils } from './common/common.js';
import { URL } from './common/constants.js';
import { ErrorBar } from './components/error';

class App extends Component {
  constructor() {
    super();

    this.state = {
        projects: [],
        users: [],
        roles: [],
        notification: '',
        cardDetails: {name: '', data: []}
    }

    this.projectsDict = {};
  }

  componentWillMount(){
    this.getProjectsList();

    Utils.performGet(URL.users())
    .then((response) => {
        this.setState({ 
            users: response.data,
            cardDetails: {name: 'Users', data: response.data}
        });
    })
    .catch((error) => {
        this.setState({ error: 'Unable to load' });
    });

    Utils.performGet(URL.roles())
    .then((response) => { 
        this.setState({ roles: response.data })
    })
    .catch((error) => {
         this.setState({ error: 'Unable to load' });
    });
  }

  //Get list of projects
  getProjectsList(){
    Utils.performGet(URL.projects())
    .then((response) => {
        this.setState({ projects: response.data });
        //Generate dictionary of projects
        this.projectsDict = Utils.createDictonary(response.data);
    })
    .catch((error) => {
        this.setState({ error: 'Unable to load' });
    });
  }

  updateProject(projectId, data) {
    const url = `http://localhost:3004/projects/${projectId}`;
    Utils.performPut(url, data)
    .then((response) => {
        this.getProjectsList();
        setTimeout(() => this.setState({ notification: '' }), 5000);
    })
    .catch((error) => {
         this.setState({ error: 'Unable to perform request' });
    });
  }

  submit = values => {
    //Get the latest data of the project
    const projectId = JSON.parse(values.project).id, formUser = JSON.parse(values.user);

    Utils.performGet(URL.projectById(projectId)) 
    .then((response) => {
        let currProject = this.projectsDict[projectId]; 

        //Check if project has users
        if(currProject.hasOwnProperty('users')) {
            //Get role selected by user, if it exists in project
            let checkRoleObj = (response.data.users).filter(user => user.role === JSON.parse(values.role).name);
            
            //Generate dictionary of project users
            let userObj = Utils.createDictonary(currProject.users);

            //Check if user exists or role exists
            if(userObj.hasOwnProperty(formUser.id) || !(userObj.hasOwnProperty(formUser.id))) {
                userObj[formUser.id] = {'id': formUser.id, 'name': formUser.name, 'role': JSON.parse(values.role).name}; 

                //If role exists, delete user
                if(checkRoleObj.length > 0 && checkRoleObj[0].id !== formUser.id) {
                    this.setState({ notification: `${formUser.name} has been updated to ${JSON.parse(values.role).name}!` });
                    delete userObj[checkRoleObj[0].id];
                }
            }

            //Add users key to project
            currProject['users'] = Utils.createArray(userObj);

            this.updateProject(projectId, currProject);   

        }
        else {
            //Create new user object
            currProject['users'] = [{'id': formUser.id, 'name': formUser.name, 'role': JSON.parse(values.role).name}];
            this.updateProject(projectId, currProject);
        }
    })
    .catch((error) => {
         this.setState({ error: 'Unable to perform request' });
    })
    
  }
  render() {
    const listValues = [
        {'name': 'Users', data: this.state.users}, 
        {'name': 'Roles', data: this.state.roles}, 
        {'name': 'Projects', data: this.state.projects}
    ]

    return (
    	<div className="wrapper">
            {this.state.error && <ErrorBar message={this.state.error}/>}

    		<h1>Datumize - Assignment</h1>
            <div className="flex-container">
                <UserRoleForm 
                    onSubmit={this.submit} 
                    notify={this.state.notification}
                    projects={this.state.projects}
                    users={this.state.users}
                    roles={this.state.roles} />

                <div className="tab-list">
                    <ul className="inline-list">
                        {listValues.map(value =>
                            <li 
                            className="white-btn" 
                            key={value.name} 
                            onClick={() => this.setState({ 
                                cardDetails: {name: value.name, data: value.data} 
                            })}>{value.name}</li>
                        )}
                    </ul>
                    <Card content={this.state.cardDetails} />
                </div>
            </div>
    		<div>
    			<table className="light-table">
    				<thead>
    					<tr>
    						<th>Name</th>
    						<th>Users</th>
    					</tr>
    				</thead>
    				<tbody>
                        {this.state.projects.map(project => 
                            <tr key={project.id}>
                                <td>{project.name}</td>
                                <td>
                                    {project.hasOwnProperty('users') ?
                                    <ul>
                                    {project.users.map(user => 
                                        <li key={user.id}>
                                            <p className="m-t-5 m-b-5">
                                                {user.name} <span className="badge">{user.role}</span>
                                            </p>
                                        </li>
                                    )}
                                    </ul> : <p>No users for this project.</p>
                                    }
                                </td>
                            </tr>
                        )}
    				</tbody>
    			</table>
    		</div>
      	</div>
    );
  }
}

export default App;
