import React, { Component } from 'react';
import BasicUser from '../Forms/BasicUser';
import { send } from '../../serverUtils';

class SingUp extends Component {
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
            await send('POST', '/register', formData)
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
                <BasicUser handleChange={this.handleChange} />
                <button disabled={this.props.cannotSubmit} type="submit" className="btn btn-primary">Done</button>
            </form>
        );
    }
}

export default SingUp;