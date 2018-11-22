import React from "react";
import { isEmpty } from "lodash";
import Input from "../FormElements/Input";
import TextArea from "../FormElements/TextArea";
import Radio from "../FormElements/Radio";
import Select from "../FormElements/Select";
import CheckBox from "../FormElements/CheckBox";
import "./form.css";
export default class DynamicForm extends React.Component {
    state = {};
    constructor(props) {
        super(props);
    }

    // componentDidMount() {
    //     if (this.props.defaultValues) {
    //         this.setState({
    //             ...this.props.defaultValues[0]
    //         })
    //     }

    // }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     if (nextProps.defaultValues && Object.keys(nextProps.defaultValues).length) {
    //         return {
    //             ...nextProps.defaultValues
    //         };
    //     }
    //     // else {
    //     //     let initialState = nextProps.model.reduce((acc, m) => {
    //     //         acc[m.key] = m.value ? m.value : "";
    //     //         return acc;
    //     //     },{});
    //     //     console.log("initialState: ", initialState);
    //     return {
    //         // ...initialState
    //     };
    //     // }
    // }

    onSubmit = e => {
        e.preventDefault();
        if (this.props.onSubmit) {
            this.props.onSubmit(this.state);
        }
    };
    
    onReset = e => {
        e.preventDefault();
    };

    onChange = (e, key, type = "single") => {
        // console.log(`${key} changed ${e.target.value} type ${type}`);
        if (type === "single") {
            this.setState({
                [key]: e.target.value
            });
        } else {
            let found = this.state[key]
                ? this.state[key].find(d => d === e.target.value)
                : false;

            if (found) {
                let data = this.state[key].filter(d => {
                    return d !== found;
                });
                this.setState({
                    [key]: data
                });
            } else {
                // console.log(this.state);
                this.setState({
                    [key]: (this.state[key] &&
                        this.state[key].concat([e.target.value])) || [e.target.value]
                });
            }
        }
    };

    validateCondition = (conditions, visible) => {
        let evaluateAndConditions;
        let evaluateOrConditions;
        if (conditions.and) {
            let evaluatedConditions = this.evaluateConditions(conditions.and);
            evaluatedConditions.filter(d => d === false).length > 0
                ? (evaluateAndConditions = false)
                : (evaluateAndConditions = true);
        }
        if (conditions.or) {
            let evaluatedConditions = this.evaluateConditions(conditions.or);
            let render = evaluatedConditions
                ? evaluatedConditions.find(d => d === true)
                : false;
            render
                ? (evaluateOrConditions = true)
                : (evaluateOrConditions = false);
        }
        evaluateAndConditions || evaluateOrConditions
            ? (visible = true)
            : (visible = false);
        return visible;
    }

    evaluateConditions = (conditions) => {
        let evaluatedConditions = [];
        let result;
        conditions.map(condition => {
            if (typeof this.state[condition.questionCode] === "object") {
                let found = this.state[condition.questionCode]
                    ? this.state[condition.questionCode].find(
                        d => d === condition.answerCode
                    )
                    : false;
                found ? (result = true) : (result = false);
            } else if (this.state[condition.questionCode] === condition.answerCode) {
                result = true;
            } else {
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

        let formUI = model.map(m => {
            let key = m.key;
            let type = m.type || "text";
            let props = m.props || {};
            let name = m.name;
            // let value = m.value;
            let conditions = m.conditions || {};
            let visible = m.visible;
            let input;

            //for textarea
            let rows = m.rows;
            let cols = m.cols;

            // let target = key;
            // value = this.state[target];

            let defaultValue = this.props.defaultValues[m.key] || "";
            let value = this.state[key] || defaultValue;

            if (!isEmpty(conditions)) {
                visible = this.validateCondition(conditions, visible);
            }

            switch (type) {
                case "textarea":
                    input = (
                        <TextArea
                            className="form-control"
                            modalKey={key}
                            name={name}
                            value={value}
                            rows={rows}
                            cols={cols}
                            label={m.label}
                            onChange={this.onChange}
                        />
                    );
                    break;
                case "radio":
                    input = (
                        <Radio
                            options={m.options}
                            type={type}
                            onChange={this.onChange}
                            setvalue={value}
                            modalKey={key}
                            label={m.label}
                        />
                    );
                    break;
                case "select":
                    input = (
                        <Select
                            className="form-control"
                            setvalue={value}
                            onChange={this.onChange}
                            options={m.options}
                            modalKey={m.key}
                            label={m.label}
                        />
                    );
                    break;
                case "checkbox":
                    input = (
                        <CheckBox
                            modalKey={m.key}
                            label={m.label}
                            options={m.options}
                            type={type}
                            setvalue={value}
                            onChange={this.onChange}
                        />
                    );
                    break;
                default:
                    input = (
                        <Input
                            className="form-control"
                            type={type}
                            modalKey={key}
                            name={name}
                            value={value}
                            label={m.label}
                            onChange={this.onChange}
                        />
                    );
            }

            if (visible) {
                return (
                    <div key={"g" + key} className="form-group">
                        {input}
                    </div>
                );
            } else {
                this.state[key] = "";
                return "";
            }
        });
        return formUI;
    };

    render() {
        let formTitle = this.props.formTitle || "Dynamic Form";
        let primaryButtonLabel = this.props.primaryButtonLabel || "Submit";
        let secondaryButtonLabel = this.props.secondaryButtonLabel || "Reset";

        return (
            <div className={this.props.className}>
                <h3 className="form-title">{formTitle}</h3>
                <form className="">
                    {this.renderForm()}
                    <div className="">
                        <button className="btn btn-primary" onClick={this.onSubmit}>{primaryButtonLabel}</button>
                        <button className="btn btn-default" onClick={this.onReset}>{secondaryButtonLabel}</button>
                    </div>
                </form>
            </div>
        );
    }
}
