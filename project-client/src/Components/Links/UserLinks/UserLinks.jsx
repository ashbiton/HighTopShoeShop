import React, { Component } from 'react';
import './UserLinks.scss';
import IconLink from '../../IconLink/IconLink';

class UserLinks extends Component {
    render() {
        return (
            <div className="row">
                <div className="col">
                    <IconLink link="/wishlist" icon="fas fa-heart"/>
                </div>
                <div className="col px-0">
                    <IconLink link="/cart" icon="fas fa-shopping-cart"/>
                </div>
                <div className="col">
                    <IconLink link="/profile" icon="fas fa-user-alt"/>
                </div>
            </div>
        );
    }
}

export default UserLinks;
