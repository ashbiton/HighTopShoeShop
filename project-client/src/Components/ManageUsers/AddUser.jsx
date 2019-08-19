import React, { Component, Fragment } from 'react';
import { send } from '../../serverUtils';
import {pick} from "lodash";
import './ManageUsers.scss';
//import { positions, gender, precent, salary, review, experience } from '../../resources';

const customerFields = ["name", "surname", "username", "password", "email", "position"];
const managerFields = [...customerFields, "gender", "salary", "experience", "phone", "precent", "hiredAt", "active"]
const employeeFields = [...managerFields, "review"];
const positions = {
    values: ["manager", "employee", "customer"],
    default: "customer",
    customer: {
        fields: customerFields
    },
    manager: {
        fields: managerFields
    },
    employee: {
        fields: employeeFields
    }

};

const gender = {
    values: ["male", "female"],
    default: "female"
};

const experience = {
    values: ["1-5 years", "5-10 years", "over 10 years"],
    default: "1-5 years"
};

const review = {
    values: ['perfect', 'sufficient', 'insufficient'],
    default: "sufficient"
};

const salary = {
    min: 30,
    default: 70
};

const precent = {
    min: 10,
    max: 100,
    default: 100
};


class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: positions.default,
            onAwait: false
        }
    }

    renderSelect = (dataField, values, defaultValue, required) => {
        return (
            <select data-field={dataField} id={dataField + "Input"} onChange={this.handleChange} className="form-control" required={required} defaultValue={defaultValue}>
                {values.map(val => (<option key={val}>{val}</option>))}
            </select>
        );
    }

    renderRadio = (dataField, values, defaultValue) => {
        return (
            <Fragment>
                {values.map((val, index) =>
                    <div key={index} className="custom-control custom-radio custom-control-inline">
                        <input onChange={this.handleChange} value={val} data-field={dataField} type="radio" id={`${dataField}-radio-${index}`} name={dataField} className="custom-control-input" defaultChecked={val === defaultValue} />
                        <label className="custom-control-label" htmlFor={`${dataField}-radio-${index}`}>{val}</label>
                    </div>)}
            </Fragment>
        )

    }

    handleChange = (event) => {
        this.setState({ [event.target.dataset.field]: event.target.value })
    }

    renderBasicFields = () => {
        return (
            <Fragment>
                <div className="form-group mb-4">
                    <label htmlFor="positionInput">Please choose the user position:</label>
                    {this.renderSelect("position", positions.values, positions.default, true)}
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <label htmlFor="usernameInput" className="sr-only">Username</label>
                        <input data-field="username" onChange={this.handleChange} id="usernameInput" placeholder="Username" className="form-control" type="text" pattern="[A-Za-z0-9_]{4,15}" required={true} />
                    </div>
                    <div className="col-md-6">
                        <small className="form-text text-muted">Username must be 4-15 characters long and can include only letters, numbers and underscore.</small>
                    </div>
                </div>
                <div className="form-group row mb-4">
                    <div className="col-md-6">
                        <label htmlFor="passwordInput" className="sr-only">Password</label>
                        <input className="form-control" data-field="password" onChange={this.handleChange} id="passwordInput" placeholder="Password" type="password" pattern="[A-Za-z0-9]{8,20}" required={true} />
                    </div>
                    <div className="col-md-6">
                        <small className="form-text text-muted">Password must be 8-20 characters long and include a capital letter, a small letter and a number.</small>
                    </div>
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
                    <input data-field="email" onChange={this.handleChange} id="emailInput" className="form-control" type="email" placeholder="Enter your email    e.g. example@gmail.com" required={true} />
                </div>
            </Fragment>);
    }

    renderExtraFields = () => {
        const { position } = this.state;
        const positionFields = positions[position].fields;
        return (
            <Fragment>
                {
                    positionFields.includes("phone") && (
                        <div className="form-group">
                            <label htmlFor="phoneInput" className="sr-only">Phone Number</label>
                            <input data-field="phone" onChange={this.handleChange} id="phoneInput" className="form-control" type="tel" placeholder="Phone number    e.g. 0501234567" pattern="05[0-9]{8}" />
                        </div>
                    )
                }

                <div className="form-row">
                    <div className="col-md-6">
                        {positionFields.includes("hiredAt") &&
                            <div className="form-group row">
                                <label htmlFor="hiredAtInput" className="col-form-label col-sm-6 text-right">Start date:</label>
                                <div className="col-sm-6">
                                    <input data-field="hiredAt" className="form-control" id="hiredAtInput" type="date" defaultValue={new Date().toISOString().substring(0, 10)} />
                                </div>
                            </div>}
                    </div>
                    <div className="col-md-6">
                        {positionFields.includes("gender") &&
                            <div className="form-group row">
                                <label htmlFor="genderInput" className="col-form-label col-sm-6 text-right">Gender:</label>
                                <div className="col-sm-6 d-flex align-items-center">
                                    {this.renderRadio("gender", gender.values, gender.default)}
                                </div>
                            </div>
                        }
                    </div>
                </div>

                <div className="form-row">
                    <div className="col-md-6">
                        {positionFields.includes("salary") &&
                            <div className="form-group row">
                                <label htmlFor="salaryInput" className="col-form-label col-sm-6 text-right">Salary per hour:</label>
                                <div className="col-sm-6">
                                    <input data-field="salary" className="form-control" id="salaryInput" type="number" min={salary.min} defaultValue={salary.default} />
                                </div>
                            </div>}
                    </div>
                    <div className="col-md-6">
                        {positionFields.includes("precent") &&
                            <div className="form-group row">
                                <label htmlFor="precentInput" className="col-form-label col-sm-6 text-right">Working percentage:</label>
                                <div className="col-sm-6">
                                    <input data-field="precent" className="form-control" id="precentInput" type="number" min={precent.min} max={precent.max} defaultValue={precent.default} step="5" />
                                </div>
                            </div>}
                    </div>
                </div>

                <div className="form-row">
                    <div className="col-md-6">
                        {
                            positionFields.includes("experience") &&
                            <div className="form-group row">
                                <label htmlFor="experienceInput" className="col-form-label col-sm-6 text-right">Experience level:</label>
                                <div className="col-sm-6">
                                    {this.renderSelect("experience", experience.values, experience.default, false)}
                                </div>
                            </div>
                        }
                    </div>
                    <div className="col-md-6">
                        {
                            positionFields.includes("review") &&
                            <div className="form-group row">
                                <label htmlFor="reviewInput" className="col-form-label col-sm-6 text-right">Manager review:</label>
                                <div className="col-sm-6">
                                    {this.renderSelect("review", review.values, review.default, false)}
                                </div>
                            </div>
                        }
                    </div>
                </div>




            </Fragment>
        );
    }

    onFormSubmitted = (event) => {
        event.preventDefault();
        let formData = this.state;
        const positionFields = positions[formData.position].fields;
        //remove unnecessary values since we took the form data from the state
        const fd = pick(formData, positionFields);
        console.log("fd ",fd);
        this.setState({ onAwait: true }, async () => {
            await send('POST', '/user', fd)
                .then((status , errors) => {
                    this.setState({ onAwait: false, message: errors });
                })
                .catch(_err => {
                    this.setState({ onAwait: false, message: "unable to add user. please try again in a few seconds." });
                })
        });

    }

    render() {
        return (
            <div className="add-user center-content">
                <div className="add-form p-5 m-2 rounded">
                    <form onSubmit={this.onFormSubmitted}>
                        {this.renderBasicFields()}
                        {this.renderExtraFields()}
                        <button disabled={this.state.onAwait} type="submit" className="btn btn-primary">Done</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddUser;