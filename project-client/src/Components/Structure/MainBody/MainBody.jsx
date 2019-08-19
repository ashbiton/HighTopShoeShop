import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import HomePage from '../../Pages/HomePage/HomePage';
import About from '../../Pages/AboutPage/About';
import Contact from '../../Pages/Contact/Contact';
import UsersRoute from '../../ManageUsers/UsersRoute';
import Register from '../../Register/Register';
import './MainBody.scss';

class MainBody extends Component {
    render() {
        return (
            <main role="main" className="container">
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/home" component={HomePage} />
                    <Route path="/about" component={About} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/register" component={Register}/>
                    {/* the following should be a private route */}
                    <Route path="/users" component={UsersRoute} />
                    {/* <PrivateRoute path="/stock" component={Stock}/>
                <PrivateRoute path="/orders" component={Orders}/>
                 */}
                </Switch>
            </main>
        )
    }
}

export default MainBody;