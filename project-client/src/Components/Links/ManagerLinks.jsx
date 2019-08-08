import React, { Fragment, Component } from 'react';
import { Link } from "react-router-dom";
import EmployeeLinks from "./EmployeeLinks";

class ManagerLinks extends Component {
    render() {
        return (
            <Fragment>
                <li className="nav-item bold-line-hover" onClick={this.props.onClickEvent}>
                    <Link className="nav-link" to="/users">USERS</Link>
                </li>
                <EmployeeLinks {...this.props}/>
            </Fragment>
        );
    }
}

export default ManagerLinks;
