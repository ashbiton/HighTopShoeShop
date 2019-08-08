import React, { Component, Fragment } from 'react';
import './HomePage.scss';
import BtnLink from '../../BtnLink/BtnLink';
import Carousel from './Carousel';

class HomePage extends Component {

    render() {
        return (
            <Fragment>
                <Carousel />
                <div className="container text-center">
                    <h1 className="mt-5 text-capitilize">High Top Shoes</h1>
                    <p className="lead text-capitilize">All The Shoes You Will Ever Need At One Place!</p>
                    <BtnLink link='/shoes' title="discover more" />
                </div>
            </Fragment>
        )
    }
}

export default HomePage;