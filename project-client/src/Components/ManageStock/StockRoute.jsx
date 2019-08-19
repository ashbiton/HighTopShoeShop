import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import AddEditItem from './AddEditItem';
import Stock from './Stock';

class StockRoute extends Component {
    render() {
        const { match } = this.props;
        return (
            <Switch>
                <Route exact path={`${match.url}/add`} component={AddEditItem} />
                <Route exact path={`${match.url}/edit/:id`} component={AddEditItem} />
                <Route path={`${match.url}/view`} component={Stock} />
                <Route path={`${match.url}/`} component={Stock} />
            </Switch>
        )
    }
}

export default StockRoute;