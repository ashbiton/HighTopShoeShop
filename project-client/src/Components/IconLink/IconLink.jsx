import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './IconLink.scss'

class IconLink extends Component {
    determineLink = () => {
        let { link, relative, path } = this.props;
        if (relative) {
            if (path.charAt(path.length - 1) === "/" && link.charAt(0) === "/") {
                link = link.substring(1);
            }
            link = path + link;
        }
        return link;
    }
    render() {
        const { icon } = this.props;
        return (
            <Link className="icon-link d-inline-flex center-content" to={this.determineLink()}>
                <i className={icon}></i>
            </Link>
        )
    }
}

export default IconLink;