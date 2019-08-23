import React, { Component } from 'react';
import './Header.scss'
import UserLinks from '../../Links/UserLinks/UserLinks';
import BtnLink from '../../BtnLink/BtnLink';
import { auth } from '../../../Auth';

class Header extends Component {
    render() {
        return (
            <header>
                <div className={`upper-bar d-flex align-items-center justify-content-end py-2 px-4`}>
                    <div className="mr-auto">
                        <BtnLink link="/contact" title="customer service" />
                    </div>
                    {auth.isAuthenticated ?
                        <UserLinks /> :
                        <BtnLink link="/register" title="sign in" />
                    }
                </div>
            </header>
        )
    }
}

export default Header;