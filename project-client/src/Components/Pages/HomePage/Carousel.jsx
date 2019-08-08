import React, { Component } from 'react';
/* https://react-slick.neostack.com/docs/get-started */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from '../../../images/5n.png';
import img2 from '../../../images/6n.png';
import img3 from '../../../images/7n.png';

class Carousel extends Component {

    render() {
        const settings = {
            arrows: true,
            dots: true,
            infinite: true,
            autoplaySpeed: 2000,
            autoplay: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <Slider {...settings}>
                <div>
                    <div className="container-fluid">
                        <div className="row center-content">
                            <div className="col">
                                <img alt="sparkly heel" className="img-fluid rounded" src={img1}></img>
                            </div>
                            <div className="col">
                                <img alt="sparkly heel" className="img-fluid rounded" src={img2}></img>
                            </div>
                            <div className="col">
                                <img alt="sparkly heel" className="img-fluid rounded" src={img3}></img>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="container-fluid">
                        <div className="row center-content">
                            <div className="col">
                                <img alt="sparkly heel" className="img-fluid rounded" src={img3}></img>
                            </div>
                            <div className="col">
                                <img alt="sparkly heel" className="img-fluid rounded" src={img1}></img>
                            </div>
                            <div className="col">
                                <img alt="sparkly heel" className="img-fluid rounded" src={img2}></img>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="container-fluid">
                        <div className="row center-content">
                            <div className="col">
                                <img alt="sparkly heel" className="img-fluid rounded" src={img2}></img>
                            </div>
                            <div className="col">
                                <img alt="sparkly heel" className="img-fluid rounded" src={img3}></img>
                            </div>
                            <div className="col">
                                <img alt="sparkly heel" className="img-fluid rounded" src={img1}></img>
                            </div>
                        </div>
                    </div>
                </div>
            </Slider>
        )
    }
}

export default Carousel;