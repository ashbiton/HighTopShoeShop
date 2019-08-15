import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import './ManageUsers.scss';
import AddUser from './AddUser';
import ViewUsers from './ViewUsers';

class UsersRoute extends Component {
    render() {
        const { match } = this.props;
        console.log("match.url "+match.url);
        return (
            <Switch>
                <Route exact path={`${match.url}/add`} component={AddUser} />
                <Route path={`${match.url}/view`} component={ViewUsers} />
                <Route path={`${match.url}/`} component={ViewUsers} />
                {/* <Route path="/edit/:id" component={EditUser} /> */}
            </Switch>
        )
    }
}

export default UsersRoute;