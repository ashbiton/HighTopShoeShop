import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './UserLinks.scss';

class UserLinks extends Component {
    render() {
        return (
            <div className="row">
                <div className="col">
                    <Link className="icon-link d-inline-flex center-content" to="/wishlist">
                        <i className="fas fa-heart"></i>
                    </Link>
                </div>
                <div className="col px-0">
                    <Link className="icon-link d-inline-flex center-content" to="/cart">
                        <i className="fas fa-shopping-cart"></i>
                    </Link>
                </div>
                <div className="col">
                    <Link className="icon-link d-inline-flex center-content" to="/profile">
                        <i className="fas fa-user-alt"></i>
                    </Link>
                </div>
            </div>
        );
    }
}

export default UserLinks;
