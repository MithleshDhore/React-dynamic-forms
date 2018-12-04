import React from "react";
import PropTypes from "prop-types";

const Select = props => {
  props.options.sort((a, b) => a.rank - b.rank);
  return (
    <React.Fragment>
      <label key={"l" + props.key} htmlFor={props.key}>
        {props.label}
      </label>
      <select
        className={props.className}
        value={props.setvalue}
        onChange={e => {
          props.onChange(e, props.modalKey, props.answerType);
        }}
      >
        <option value="" />
        {props.options.map(op => {
          return (
            <option key={op.key} value={op.value}>
              {op.label}
            </option>
          );
        })}
      </select>
    </React.Fragment>
  );
};

Select.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  options: PropTypes.array
};

export default Select;
