import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import './Navbar.scss'
import Links from '../../Links/Links';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeLink: ''
        }
    }

    onClickEvent = (e) => {
        let activeLink = e.currentTarget;
        activeLink.classList.add('active');
        if (this.state.activeLink) {
            this.state.activeLink.classList.remove('active');
        }
        this.setState({ activeLink });
    }

    render() {
        return (
            <Fragment>
                <div className="d-flex w-100 center-content pb-4 pt-2" onClick={this.onClickEvent}>
                    <Link to="/" className="brand">High Top</Link>
                </div>
                <nav className="navbar sticky-top navbar-expand-md navbar-light mx-3 p-0">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                        <ul className="navbar-nav justify-content-around">
                            <Links onClickEvent={this.onClickEvent} />
                        </ul>
                    </div>
                </nav>
            </Fragment>
        )
    }
}

export default Navbar;