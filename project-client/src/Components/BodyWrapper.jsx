import React, { Component, Fragment } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import MainBody from './MainBody'
import "../App.css";
class BodyWrapper extends Component {
    render() {
        return (
            <Fragment>
                <Navbar />
                <MainBody />
                <Footer />
            </Fragment>
        )
    }
}

export default BodyWrapper;