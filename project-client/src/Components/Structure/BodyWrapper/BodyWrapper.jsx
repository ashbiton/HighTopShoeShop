import React, { Component, Fragment } from 'react';
import Header from "../Header/Header";
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import MainBody from '../MainBody/MainBody'
import "./BodyWrapper.scss";
class BodyWrapper extends Component {
    render() {
        return (
            <Fragment>
                <Header/>
                <Navbar />
                <MainBody />
                <Footer />
            </Fragment>
        )
    }
}

export default BodyWrapper;