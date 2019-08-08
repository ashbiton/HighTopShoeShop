import React, { Component } from 'react';
import { Route } from "react-router-dom";
import './MainBody.scss';
import HomePage from '../../Pages/HomePage/HomePage';
import About from '../../Pages/AboutPage/About';
import Contact from '../../Pages/Contact/Contact';

class MainBody extends Component {
    render() {
        return (
            <main role="main" className="container">
                <Route exact path="/" component={HomePage} />
                <Route exact path="/home" component={HomePage} />
                <Route exact path="/home/dan" component={About} />
                <Route path="/about" component={About} />
                <Route path="/contact" component={Contact} />
                {/* <PrivateRoute path="/stock" component={Stock}/>
                <PrivateRoute path="/orders" component={Orders}/>
                <PrivateRoute path="/users" component={ManageUsers}/> */}
            </main>
        )
    }
}

export default MainBody;