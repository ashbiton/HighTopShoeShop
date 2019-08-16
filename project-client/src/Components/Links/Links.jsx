import React, { Component } from 'react';
import ManagerLinks from './ManagerLinks';
import GeneralLinks from "./GeneralLinks";
import EmployeeLinks from './EmployeeLinks';

class Links extends Component {
    render() {
        const position = "manager";
        switch (position) {
            case "manager":
                return <ManagerLinks {...this.props} />
            case "employee":
                return <EmployeeLinks {...this.props} />
            default:
                return <GeneralLinks {...this.props} />
        }
    }
}

export default Links;
