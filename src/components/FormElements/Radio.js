import React from "react";
import PropTypes from "prop-types";

const Radio = props => {
  props.options.sort((a, b) => a.rank - b.rank);
  return (
    <React.Fragment>
      <label key={"l" + props.key} htmlFor={props.key}>
        {props.label}
      </label>
      {props.options.map(o => {
        return (
          <div className={props.className} key={"fr " + o.key}>
            <input
              id={o.key}
              type={props.type}
              key={o.key}
              checked={o.value === props.setvalue}
              value={o.value}
              onChange={e => {
                props.onChange(e, props.modalKey, props.answerType);
              }}
            />
            <label htmlFor={o.key} key={"ll" + o.key}>
              {o.label}
            </label>
          </div>
        );
      })}
    </React.Fragment>
  );
};

Radio.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string
};
export default Radio;
