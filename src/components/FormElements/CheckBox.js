import React from "react";
import PropTypes from "prop-types";

const CheckBox = props => {
  props.options.sort((a, b) => a.rank - b.rank);
  return (
    <React.Fragment>
      <label key={"l" + props.key} htmlFor={props.key}>
        {props.label}
      </label>
      {props.options.map(op => {
        let checked = false;
        if (props.setvalue && props.setvalue.length > 0) {
          checked = props.setvalue.indexOf(op.value) > -1 ? true : false;
        }
        return (
          <React.Fragment key={"cfr" + op.key}>
            <div className={props.className} style={{ paddingLeft: "0" }}>
              <input
                id={op.key}
                className={props.className}
                type={props.type}
                name={op.name}
                checked={checked}
                value={op.value}
                onChange={e => {
                  props.onChange(e, props.modalKey, props.answerType);
                }}
              />
              <label htmlFor={op.key} key={"ll" + op.key}>
                {op.label}
              </label>
            </div>
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};

CheckBox.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string
};
export default CheckBox;
