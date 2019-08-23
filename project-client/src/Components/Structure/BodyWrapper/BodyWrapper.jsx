import React, { Component, Fragment } from 'react';
import Header from "../Header/Header";
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import MainBody from '../MainBody/MainBody';
import { auth } from '../../../Auth';
import Loader from '../../Loader/Loader'
import "./BodyWrapper.scss";
import { setTimeout } from 'timers';
class BodyWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false
        }
    }
    componentDidMount() {
        setTimeout(() => {
            auth.getUser().then((res) => {
                this.setState({ ready: !this.state.ready });
            })
        }, 3000);

    }
    render() {
        if (this.state.ready) {
            return (
                <Fragment>
                    <Header />
                    <Navbar />
                    <MainBody />
                    <Footer />
                </Fragment>

            )
        } else {
            return (<Loader />)
        }
    }
}

export default BodyWrapper;