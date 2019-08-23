import React, { Component } from 'react';
import './Loader.scss';
import loaderImg from "../../images/loader_img.png";

class Loader extends Component {
    render() {
        return (
            <div className="whole-page d-flex align-items-center justify-content-center">
                <div className="img-container">
                    <img src={loaderImg} alt="loading content"/>
                </div>
            </div>
        )
    }
}

export default Loader;