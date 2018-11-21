import React from 'react';
import { isEmpty } from 'lodash';
import validators from './validators';
import './form.css';

export default class DynamicForm extends React.Component {
    state = {};
    constructor(props) {
        super(props);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.defaultValues && Object.keys(nextProps.defaultValues).length) {
            return {
                ...nextProps.defaultValues
            }
        }
        // else {
        //     // Assign default values of "" to our controlled input
        //     // If we don't do this, React will throw the error
        //     // that Input elements should not switch from uncontrolled to controlled 
        //     // or (vice versa)

        //     let initialState = nextProps.model.reduce((acc, m) => {
        //         acc[m.key] = m.value ? m.value : "";
        //         return acc;
        //     },{});
        //     console.log("initialState: ", initialState);
        return {
            // ...initialState
        }
        // }
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.props.onSubmit) {
            this.props.onSubmit(this.state);
        }
    }

    onChange = (e, key, type = "single") => {
        // console.log(`${key} changed ${e.target.value} type ${type}`);
        if (type === "single") {
            this.setState({
                [key]: e.target.value
            });
        } else {
            let found = this.state[key] ?
                this.state[key].find((d) => d === e.target.value) : false;

            if (found) {
                let data = this.state[key].filter((d) => {
                    return d !== found;
                });
                this.setState({
                    [key]: data
                });
            } else {
                // console.log(this.state);
                this.setState({
                    [key]: (this.state[key] && this.state[key].concat([e.target.value])) || [e.target.value]
                });
            }
        }

    }

    evaluateConditions = (conditions) => {
        let evaluatedConditions = [];
        let result;
        conditions.map((condition) => {
            if (typeof (this.state[condition.questionCode]) === 'object') {
                let found = this.state[condition.questionCode] ?
                    this.state[condition.questionCode].find((d) => d === condition.answerCode) : false;
                found ? result = true : result = false;
            }
            else if (this.state[condition.questionCode] === condition.answerCode) {
                result = true;
            }
            else {
                result = false;
            }
            evaluatedConditions.push(result);
        });
        return evaluatedConditions;
    }

    renderForm = () => {
        let model = this.props.model;
        model.sort((a, b) => a.rank - b.rank);
        // let defaultValues = this.props.defaultValues;

        let formUI = model.map((m) => {
            let key = m.key;
            let type = m.type || "text";
            let props = m.props || {};
            let name = m.name;
            let value = m.value;
            let conditions = m.conditions || {};
            let visible = m.visible;

            //for textarea
            let rows = m.rows;
            let cols = m.cols;

            let target = key;
            value = this.state[target];

            if (!isEmpty(conditions)) {
                let evaluateAndConditions;
                let evaluateOrConditions;
                if (conditions.and) {
                    let evaluatedConditions = this.evaluateConditions(conditions.and);
                    evaluatedConditions.filter((d) => d === false).length > 0 ? evaluateAndConditions = false : evaluateAndConditions = true;
                }
                if (conditions.or) {
                    let evaluatedConditions = this.evaluateConditions(conditions.or);
                    let render = evaluatedConditions ? evaluatedConditions.find((d) => d === true) : false;
                    render ? evaluateOrConditions = true : evaluateOrConditions = false;
                }
                (evaluateAndConditions || evaluateOrConditions) ? visible = true : visible = false;
            }

            let input = <input {...props}
                className="form-control"
                type={type}
                key={key}
                name={name}
                value={value}
                onChange={(e) => { this.onChange(e, target) }}
            />;

            if (type === "textarea") {
                input = <textarea {...props}
                    className="form-control"
                    key={key}
                    name={name}
                    value={value}
                    rows={rows}
                    cols={cols}
                    onChange={(e) => { this.onChange(e, target) }}
                />;
            }

            if (type === "radio") {
                input = m.options.map((o) => {
                    let checked = o.value === value;
                    return (
                        <React.Fragment key={'fr' + o.key}>
                            <input {...props}
                                className=""
                                type={type}
                                key={o.key}
                                name={o.name}
                                checked={checked}
                                value={o.value}
                                onChange={(e) => { this.onChange(e, o.name) }}
                            />
                            <label className="radio-inline mar-r-30" key={"ll" + o.key}>{o.label}</label>
                        </React.Fragment>
                    );
                });
                input = <div className="form-group-radio">{input}</div>;
            }

            if (type === "select") {
                input = m.options.map((o) => {
                    let checked = o.value === value;
                    // console.log("select: ", o.value, value);
                    return (
                        <option {...props}
                            className=""
                            key={o.key}
                            value={o.value}
                        >{o.value}</option>
                    );
                });
                // console.log("Select default: ", value);
                input = <select className="form-control" value={value} onChange={(e) => { this.onChange(e, m.key) }}>
                    <option value=''></option>
                    {input}</select>;
            }

            if (type === "checkbox") {
                input = m.options.map((o) => {

                    // let checked = o.value == value;
                    let checked = false;
                    if (value && value.length > 0) {
                        checked = value.indexOf(o.value) > -1 ? true : false;
                    }
                    // console.log("Checkbox: ", checked);
                    return (
                        <React.Fragment key={"cfr" + o.key}>
                            <div className="col-md-12" style={{ paddingLeft: "0" }}>
                                <input {...props}
                                    className=""
                                    type={type}
                                    key={o.key}
                                    name={o.name}
                                    checked={checked}
                                    value={o.value}
                                    onChange={(e) => { this.onChange(e, m.key, "multiple") }}
                                />
                                <label className="checkbox-inline mar-r-30" key={"ll" + o.key}>{o.label}</label>
                            </div>
                        </React.Fragment>
                    );
                });

                input = <div>{input}</div>;

            }

            if (visible) {
                return (
                    (<div key={'g' + key} className="form-group">
                        <label
                            key={"l" + key}
                            htmlFor={key}>
                            {m.label}
                        </label>
                        {input}
                    </div>)
                );
            }
            else {
                this.state[target] = '';
                return '';
            }
        });
        return formUI;
    }

    render() {
        let title = this.props.title || "Dynamic Form";

        return (
            <div className={this.props.className}>
                <h3 className="form-title">{title}</h3>
                <form className="card" onSubmit={(e) => { this.onSubmit(e) }}>
                    {this.renderForm()}
                    <div className="">
                        <button className="btn btn-primary" type="submit">submit</button>
                        {/* <button className="btn btn-default mar-l-10">clear</button> */}
                    </div>
                </form>
            </div>
        )
    }
}