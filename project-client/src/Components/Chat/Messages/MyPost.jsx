import React, { Component } from 'react';
import './Post.scss';

// PROPS: post - which contains standart post data (by model)
// my post is a component for the user that is logged in posts
// it is aligned to the right and the user can view it's details but cannot like / unlike it
class MyPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDetails: false
        }
    }
    render() {
        return (
            <div className="my-post container ml-auto">
                <div className="row">
                    <div className="col mr-auto text-muted">{this.props.post.time}</div>
                </div>
                <div className="row">
                    {this.props.post.text}
                </div>
            </div>
        )
    }
}

export default MyPost;