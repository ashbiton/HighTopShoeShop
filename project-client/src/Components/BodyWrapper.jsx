import React, { Component } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import MainBody from './MainBody'
import "../App.css";
class BodyWrapper extends Component {
    render() {
        return (
            <div className="container-fluid p-0 h-100">
                <Navbar />
                <div class="bodyWrapper w-100 d-flex flex-column flex-nowrap">
                    <MainBody />
                    <Footer />
                </div>
            </div>
        )
    }
}

export default BodyWrapper;