import React from "react";
import PropTypes from "prop-types";

const Input = props => {
  return (
    <React.Fragment>
      <label key={"l" + props.key} htmlFor={props.key}>
        {props.label}
      </label>
      <input
        className={props.className}
        type={props.type}
        key={props.key}
        name={props.name}
        value={props.value}
        onChange={e => {
          props.onChange(e, props.modalKey);
        }}
      />
    </React.Fragment>
  );
};

Input.propTypes = {
  name: PropTypes.string,
  key: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.funcion,
  label: PropTypes.label
};

export default Input;
