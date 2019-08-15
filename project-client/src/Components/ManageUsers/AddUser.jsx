import React, { Component, Fragment } from 'react';
import './ManageUsers.scss';

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: "customer",
        }
    }
    handleChange = (event) => {
        this.setState({[event.target.dataset.field] : event.target.value})
    }
    renderBasicFields = () => {
        return (
            <Fragment>
                <div className="form-group mb-4">
                    <label htmlFor="positionInput">Please choose the user position:</label>
                    <select data-field="position" id="positionInput" onChange={this.handleChange} className="form-control" required={true} defaultValue="customer">
                        <option>customer</option>
                        <option>employee</option>
                        <option>manager</option>
                    </select>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="nameInput" className="sr-only">Name</label>
                        <input data-field="name" onChange={this.handleChange} id="nameInput" className="form-control text-capitalize" type="text" pattern="[A-Za-z]{2,}" placeholder="Given Name" required={true} />
                    </div>

                    <div className="form-group col-md-6 ">
                        <label htmlFor="surnameInput" className="sr-only">Surname</label>
                        <input data-field="surname" onChange={this.handleChange} id="surnameInput" className="form-control text-capitalize" type="text" pattern="[A-Za-z]{2,}" placeholder="Surname" required={true} />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="emailInput" className="sr-only">Email</label>
                    <input data-field="email" onChange={this.handleChange} id="emailInput" className="form-control" type="email"  placeholder="Enter your email    e.g. example@gmail.com" required={true} />
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="usernameInput" className="sr-only">Username</label>
                        <input data-field="username" onChange={this.handleChange} id="usernameInput" placeholder="Username" className="form-control" type="text"  pattern="[A-Za-z0-9_]{4,15}" required={true} />
                        <small className="form-text text-muted">Username must be 4-15 characters long</small>
                        <small className="form-text text-muted">Username can include only letters, numbers and underscore</small>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="passwordInput" className="sr-only">Password</label>
                        <input data-field="password" onChange={this.handleChange} id="passwordInput" placeholder="Password" className="form-control" type="password" pattern="[A-Za-z0-9]{8,20}" required={true} />
                        <small className="form-text text-muted">Password must be 6-12 characters long</small>
                        <small className="form-text text-muted">Password can include at least one capital letter, one small letter and one number</small>
                    </div>
                </div>
            </Fragment>);
    }
    renderExtraFields = () => {
    }
    onFormSubmitted = (event) => {
        event.preventDefault();
        console.log(this.state);
    }
    render() {
        return (
            <div className="add-user center-content">
                <div className="add-form p-5 m-2 rounded">
                    <form onSubmit={this.onFormSubmitted}>
                        {this.renderBasicFields()}
                        {this.renderExtraFields()}

                        <button type="submit" onSubmit={this.onFormSubmitted} className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddUser;