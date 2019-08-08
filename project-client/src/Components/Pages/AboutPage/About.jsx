import React, { Component } from 'react';
import blackShoe from '../../../images/8.1.jpg';
import pinkShoe from '../../../images/8.2.1.jpg';
import colorfulShoe from '../../../images/8.3.1.jpg';
import './About.scss';

class About extends Component {
    render() {

        return (
            <div className="container about-container">
                <div className="row align-item-center">
                    <div className="col-lg-8 col-md-10">
                        <p className="text-capitalize brand brand-small">high end. top quality.</p>
                        <p className="text-capitalize lead">give a girl the right <b>heel</b> and she can conquar the world.</p>
                        <div className="larger-text">
                            <p><span className="text-capitalize">high top</span> is an online paradise of high end designer heels.</p>
                            <p>From the bold patterns of <i>Versace</i> to the elegance beauty of <i>Dior</i>.<br />
                            From the interwined C's of <i>Chanel</i> to the signature red of <i>Christian Louboutin</i>.</p>
                            <p>The shop features heels from the latest collection from all the houte cuture fashion houses you admire.</p>
                            <p>Discover a whole world of latest fashion trends, long standing elegancy and forever living of vintage. </p>
                        </div>
                    </div>
                    <div className="col-md d-flex flex-row flex-lg-column justify-content-around align-items-center">
                        <div className="about-square-img center-content">
                            <img src={colorfulShoe} className="img-fluid" />
                        </div>
                        <div className="about-square-img center-content">
                            <img src={pinkShoe} className="img-fluid" />
                        </div>
                        <div className="about-square-img center-content">
                            <img src={blackShoe} className="img-fluid" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default About;