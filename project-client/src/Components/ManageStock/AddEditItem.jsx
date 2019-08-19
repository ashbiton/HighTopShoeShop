import React, { Component } from 'react';
import { sizes, quentity, colors } from '../../shoe-resources';
import { split, toNumber } from 'lodash';
import './ManageStock.scss';

class AddEditItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quentityPerSize: new Array(sizes.values.length).fill(quentity.default),
            colors: new Array(colors.length).fill(false),
            name: '',
            description: '',
            source: '',
            price: 300,
            image: '',
            onAwait: false
        }
    }

    getIndexFromId = (id) => {
        // assuming the id form is <field>-<index>
        return toNumber(split(id, '-', 2)[1]);
    }

    onQuentityChange = (event) => {
        let quentityPerSize = this.state.quentityPerSize;
        const index = this.getIndexFromId(event.target.id);
        quentityPerSize[index] = toNumber(event.target.value);
        this.setState({ quentityPerSize })
    }


    onColorChange = (event) => {
        let colors = this.state.colors;
        const index = this.getIndexFromId(event.target.id);
        colors[index] = event.target.checked;
        this.setState({ colors });
    }

    onChangeHandle = (event) => {
        this.setState({ [event.target.dataset.field]: event.target.value })
    }

    renderQuentityPerSize = (singleQuentity, index) => {
        const id = `quentity-${index}`;
        const size = sizes.values[index];
        return (
            <div key={id} className="form-group row size-quentity-group">
                <label htmlFor={id} className="col-3 col-form-label text-right">{size}</label>
                <div className="col-9">
                    <input id={id} className="form-control" type="number" min={quentity.min} max={quentity.max} value={singleQuentity} onChange={this.onQuentityChange} />
                </div>
            </div>
        );
    }
    renderColor = (colorChecked, index) => {
        const { name, value } = colors[index];
        const style = { backgroundColor: value };
        const id = `color-${index}`;
        return (
            <div key={id} className="custom-control custom-checkbox" title={name}>
                <input type="checkbox" className="custom-control-input color-checkbox" name={name} value={name} id={id} checked={colorChecked} onChange={this.onColorChange} />
                <label className="shoe-color-pick center-content" htmlFor={id} style={style} />
            </div>
        );

    }
    onFormSubmitted = (event) => {
        event.preventDefault();
        const fd = new FormData(event.currentTarget);
        fd.forEach((value, key) => {
            console.log("key", key, "value", value);
        });
        const method = 'POST'; //could be changed to PUT if on edit mode
        this.setState({onAwait: true}, async () => {
            await send(method, '/shoes', fd)
                .then((status, errors) => {
                    this.setState({ onAwait: false, message: errors });
                })
                .catch(_err => {
                    this.setState({ onAwait: false, message: "unable to add user. please try again in a few seconds." });
                })
        })

    }
    render() {
        return (
            <div className="center-content w-100">
                <div className="p-5 m-2 rounded floating-div-shadow">
                    <form onSubmit={this.onFormSubmitted} method="post" enctype="multipart/form-data" action="/shoes/add">
                        <div className="row">
                            {/* IMAGE */}
                            <div className="col-md">
                                <div className="form-group">
                                    <label htmlFor="imageInput" className="sr-only">shoe image input</label>
                                    <input onChange={this.onChangeHandle} src={this.state.image} className="form-control-file" data-field="image" id="imageInput" name="file" type="file" accept="image/png, image/jpeg, image/jpg" required="required" />
                                </div>
                            </div>
                            {/* NAME, DESCRIPTION, SOURCE AND PRICE */}
                            <div className="col-md">
                                {/* NAME */}
                                <div className="row form-group">
                                    <label className="sr-only" htmlFor="nameInput">shoe name</label>
                                    <input onChange={this.onChangeHandle} type="text" className="form-control text-capitalize" data-field="name" required={true} name="name" value={this.state.name} placeholder="Shoe Name" maxLength={15} />
                                </div>
                                {/* DESCRIPTION */}
                                <div className="row form-group">
                                    <label className="sr-only" htmlFor="descriptionInput">shoe description</label>
                                    <textarea onChange={this.onChangeHandle} id="descriptionInput" maxLength={40} name="description" data-field="description" className="form-control" rows="2" placeholder="Description" value={this.state.description}></textarea>
                                </div>
                                {/* SOURCE */}
                                <div className="row form-group">
                                    <label className="sr-only" htmlFor="sourceInput">shoe brand</label>
                                    <input onChange={this.onChangeHandle} id="sourceInput" type="text" className="form-control" data-field="source" required={true} name="source" value={this.state.source} placeholder="Brand" />
                                </div>
                                {/* PRICE */}
                                <div className="row form-group">
                                    <label className="col-sm-2 col-form-label px-0 mx-0" htmlFor="priceInput">Price</label>
                                    <div className="col-sm-10 px-0 mx-0">
                                        <input onChange={this.onChangeHandle} type="number" className="form-control" id="priceInput" data-field="price" required={true} name="price" value={this.state.price} min={30} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* COLORS */}
                        <div className="row mt-2">
                            <div className="col">
                                <label>Pick the color/s as appear in the above image</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="d-flex justify-content-between align-items-center w-100 flex-wrap">
                                {this.state.colors.map(this.renderColor)}
                            </div>
                        </div>
                        {/* QUENTITY PER SIZE */}
                        <div className="row mt-2">
                            <div className="col"><label>Pick quentity in stock per size</label></div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="d-flex justify-content-between align-items-center flex-wrap">
                                    {this.state.quentityPerSize.map(this.renderQuentityPerSize)}
                                </div>

                            </div>
                        </div>
                        <button disabled={this.state.onAwait} type="submit" className="btn btn-primary">Done</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddEditItem;