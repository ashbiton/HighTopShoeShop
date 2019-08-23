import React, { Component } from 'react';
import './Post.scss';
import LikeUnlike from './LikeUnlike';

// PROPS: post - which contains user info and standart post data (by model)
// other post is a component for other people posts - it is aligned to the left and the user can like / unlike it and view it's details
class OtherPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDetails: false
        }
    }
    render() {
        return (
            <div className="other-post container mr-auto">
                <div className="row">
                    <div className="col mr-auto">{`@${this.props.user.username}`}</div>
                    <div className="col ml-auto text-muted">{this.props.post.time}</div>
                </div>
                <div className="row">
                    {this.props.post.text}
                </div>
                <div className="row">
                    <LikeUnlike {...this.props} />
                </div>
            </div>
        )
    }
}

export default OtherPost;