import React, { Component, Fragment } from 'react';
import { send } from '../../serverUtils';
import { pick } from "lodash";
import BasicUser from '../Forms/BasicUser';
import Select from '../Forms/Select';
import Radio from '../Forms/Radio';
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

    handleChange = (event) => {
        this.setState({ [event.target.dataset.field]: event.target.value })
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
                                    {/* {this.renderRadio("gender", gender.values, gender.default)} */}
                                    <Radio dataField="gender" values={gender.values} defaultValue={gender.default} handleChange={this.handleChange} />
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
                                    <Select dataField="experience" values={experience.values} defaultValue={experience.default} required={false} handleChange={this.handleChange} />
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
                                    <Select dataField="review" values={review.values} defaultValue={review.default} required={false} handleChange={this.handleChange} />
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
        console.log("fd ", fd);
        this.setState({ onAwait: true }, async () => {
            await send('POST', '/user', fd)
                .then((status, errors) => {
                    this.setState({ onAwait: false, message: errors });
                })
                .catch(_err => {
                    this.setState({ onAwait: false, message: "unable to add user. please try again in a few seconds." });
                })
        });

    }

    render() {
        return (
            <div className="w-100 center-content">
                <div className="floating-div-shadow p-5 m-2 rounded">
                    <form onSubmit={this.onFormSubmitted}>
                        <div className="form-group mb-4">
                            <label htmlFor="positionInput">Please choose the user position:</label>
                            <Select dataField="position" values={positions.values} defaultValue={positions.default} required={true} handleChange={this.handleChange} ></Select>
                        </div>
                        <BasicUser handleChange={this.handleChange} />
                        {this.renderExtraFields()}
                        <button disabled={this.state.onAwait} type="submit" className="btn btn-primary">Done</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddUser;