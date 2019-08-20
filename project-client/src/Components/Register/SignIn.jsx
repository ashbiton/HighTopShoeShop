import React, { Component } from 'react';
import { send } from '../../serverUtils';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: null
        }
    }
    handleChange = (event) => {
        this.setState({ [event.target.dataset.field]: event.target.value })
    }
    onFormSubmitted = (event) => {
        event.preventDefault();
        let formData = this.state;
        delete formData.message;
        this.props.onFormSubmitted(async () => {
            await send('POST', '/signin', formData)
                .then((status, errors) => {
                    this.props.onAnswerRecieved();
                    this.setState({ message: errors });
                })
                .catch(_err => {
                    this.props.onAnswerRecieved();
                    this.setState({ message: _err });
                })
        });
    }
    render() {
        return (
            <form onSubmit={this.onFormSubmitted}>
                <div class="form-group">
                    <label htmlFor="usernameInput" className="sr-only">Username</label>
                    <input onChange={this.handleChange} data-field="username" id="usernameInput" placeholder="Username" className="form-control" type="text" pattern="[A-Za-z0-9_]{4,15}" required={true} />
                </div>
                <div class="form-group">
                    <label htmlFor="passwordInput" className="sr-only">Password</label>
                    <input onChange={this.handleChange} className="form-control" data-field="password" id="passwordInput" placeholder="Password" type="password" pattern="[A-Za-z0-9]{8,20}" required={true} />
                </div>
                <button disabled={this.props.cannotSubmit} type="submit" className="btn btn-primary">Done</button>
                <button type="button" class="btn btn-link text-uppercase" data-toggle="modal" data-target="#forgotPasswordModal"><small>FORGOT password</small></button>
            </form>
        );
    }
}

export default SignIn;