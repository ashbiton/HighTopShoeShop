import React, { Fragment, Component } from 'react';
import { Link } from "react-router-dom";

class GeneralLinks extends Component {
    render() {
        return (
            <Fragment>
                <li className="nav-item bold-line-hover" onClick={this.props.onClickEvent}>
                    <Link className="nav-link" to="/shoes">SHOES</Link>
                </li>
                <li className="nav-item bold-line-hover" onClick={this.props.onClickEvent}>
                    <Link className="nav-link" to="/about">ABOUT</Link>
                </li>
                <li className="nav-item bold-line-hover" onClick={this.props.onClickEvent}>
                    <Link className="nav-link" to="/contact">CONTACT US</Link>
                </li>
            </Fragment>
        );
    }
}

export default GeneralLinks;
