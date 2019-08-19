import React, { Component } from 'react';
import SignIn from './SignIn';
import SingUp from './SignUp';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onAwait: false
        }
    }
    onSignIn = (cb) => {
        this.setState({ onAwait: true, choosenAction: "sign-in" }, cb)
    }
    onSignUp = (cb) => {
        this.setState({ onAwait: true, choosenAction: "sign-up" }, cb)

    }
    onAnswerRecieved = () => {
        this.setState({ onAwait: false, choosenAction: "" });
    }
    render() {
        return (
            <div className='container w-80'>
                <dic className="row">
                    {/* SING UP SIDE */}
                    <div className="col">
                        <p className="text-capitalize">SIGN UP</p>
                        <SingUp onFormSubmitted={this.onSignUp} onAnswerRecieved={this.onAnswerRecieved} cannotSubmit={this.state.onAwait} />
                    </div>
                    {/* SIGN IN SIDE */}
                    <div className="col">
                        <p className="text-capitalize">SIGN IN</p>
                        <SignIn onFormSubmitted={this.onSignIn} onAnswerRecieved={this.onAnswerRecieved} cannotSubmit={this.state.onAwait} />
                    </div>
                </dic>
            </div>
        )
    }
}

export default Register;