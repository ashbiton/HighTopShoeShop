import React, { Component } from 'react';
// import { Route } from "react-router-dom";
import './ManageUsers.scss';
import IconLink from '../IconLink/IconLink';

class ViewUsers extends Component {
    render() {
        return (
            <div>
                <IconLink relative={true} link="/add" path={this.props.match.url} icon="fas fa-user-plus" />
            </div>
        )
    }
}

export default ViewUsers;