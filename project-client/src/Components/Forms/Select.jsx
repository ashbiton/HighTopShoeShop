import React from 'react';

function Select({ dataField, values, defaultValue, required, handleChange }) {
    return (
        <select data-field={dataField} id={dataField + "Input"} onChange={handleChange} className="form-control" required={required} defaultValue={defaultValue}>
            {values.map(val => (<option key={val}>{val}</option>))}
        </select>
    );
}
export default Select;