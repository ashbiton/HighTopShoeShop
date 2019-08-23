import React, { Component } from 'react';
import './Post.scss';

class LikeUnlike extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="d-flex align-items-center justify-content-end">
                <div className="like-unlike-icon"><i className="fas fa-thumbs-up"></i></div>
                <div>{this.props.responses.likeCount}</div>
                <div className="like-unlike-icon"><i className="fas fa-thumbs-down"></i></div>
                <div>{this.props.responses.unlikeCount}</div>
            </div>
        )
    }
}

export default LikeUnlike;