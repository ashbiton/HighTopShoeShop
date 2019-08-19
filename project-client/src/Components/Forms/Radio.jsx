import React, { Fragment } from 'react';

function Radio({ dataField, values, defaultValue, handleChange }) {
    return (
        <Fragment>
            {values.map((val, index) =>
                <div key={index} className="custom-control custom-radio custom-control-inline">
                    <input onChange={handleChange} value={val} data-field={dataField} type="radio" id={`${dataField}-radio-${index}`} name={dataField} className="custom-control-input" defaultChecked={val === defaultValue} />
                    <label className="custom-control-label" htmlFor={`${dataField}-radio-${index}`}>{val}</label>
                </div>)}
        </Fragment>
    )
}
export default Radio;