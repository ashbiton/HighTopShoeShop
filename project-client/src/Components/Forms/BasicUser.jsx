import React, { Fragment } from 'react';

function BasicUser({ handleChange }) {
    return (
        <Fragment>
            <div className="form-group row">
                <div className="col-md-6">
                    <label htmlFor="usernameInput" className="sr-only">Username</label>
                    <input data-field="username" onChange={handleChange} id="usernameInput" placeholder="Username" className="form-control" type="text" pattern="[A-Za-z0-9_]{4,15}" required={true} />
                </div>
                <div className="col-md-6">
                    <small className="form-text text-muted">Username must be 4-15 characters long and can include only letters, numbers and underscore.</small>
                </div>
            </div>
            <div className="form-group row mb-4">
                <div className="col-md-6">
                    <label htmlFor="passwordInput" className="sr-only">Password</label>
                    <input className="form-control" data-field="password" onChange={handleChange} id="passwordInput" placeholder="Password" type="password" pattern="[A-Za-z0-9]{8,20}" required={true} />
                </div>
                <div className="col-md-6">
                    <small className="form-text text-muted">Password must be 8-20 characters long and include a capital letter, a small letter and a number.</small>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="nameInput" className="sr-only">Name</label>
                    <input data-field="name" onChange={handleChange} id="nameInput" className="form-control text-capitalize" type="text" pattern="[A-Za-z]{2,}" placeholder="Given Name" required={true} />
                </div>

                <div className="form-group col-md-6 ">
                    <label htmlFor="surnameInput" className="sr-only">Surname</label>
                    <input data-field="surname" onChange={handleChange} id="surnameInput" className="form-control text-capitalize" type="text" pattern="[A-Za-z]{2,}" placeholder="Surname" required={true} />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="emailInput" className="sr-only">Email</label>
                <input data-field="email" onChange={handleChange} id="emailInput" className="form-control" type="email" placeholder="Enter your email    e.g. example@gmail.com" required={true} />
            </div>
        </Fragment>);
}

export default BasicUser;