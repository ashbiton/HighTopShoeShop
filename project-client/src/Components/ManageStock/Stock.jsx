import React, { Component } from 'react';
import IconLink from '../IconLink/IconLink';

class Stock extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <p>Stock</p>
                <IconLink relative={true} link="/add" path={this.props.match.url} icon="fas fa-plus" />
            </div>
         );
    }
}
 
export default Stock;