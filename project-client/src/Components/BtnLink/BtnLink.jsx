import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './BtnLink.scss'

class BtnLink extends Component {
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
            <Link to={this.determineLink()} className={`custom-btn-link ${icon && 'no-outline'}`}>
                <span className="custom-btn-link-content">
                    {icon && <i className={`${icon} pr-2`}></i>}
                    <span className="custom-btn-link-title text-uppercase">{this.props.title}</span>
                </span>
            </Link>
        )
    }
}

export default BtnLink;