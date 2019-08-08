import React, { Fragment, Component } from 'react';
import { Link } from "react-router-dom";
import GeneralLinks from "./GeneralLinks";

class EmployeeLinks extends Component {
    render() {
        return (
            <Fragment>

                <li className="nav-item bold-line-hover" onClick={this.props.onClickEvent}>
                    <Link className="nav-link" to="/stock">STOCK</Link>
                </li>
                <li className="nav-item bold-line-hover" onClick={this.props.onClickEvent}>
                    <Link className="nav-link" to="/orders">ORDERS</Link>
                </li>
                <GeneralLinks {...this.props}/>
            </Fragment>
        );
    }
}

export default EmployeeLinks;
