import React from "react";
import PropTypes from "prop-types";

const Radio = props => {
  props.options.sort((a, b) => a.rank - b.rank);
  return (
    <React.Fragment>
      <label key={"l" + props.key} htmlFor={props.key}>
        {props.label}
      </label>
      <div className="form-group-radio">
        {props.options.map(o => {
          return (
            <React.Fragment key={"fr " + o.key}>
              <input
                className={props.className}
                type={props.type}
                key={o.key}
                checked={o.value === props.setvalue}
                value={o.value}
                onChange={e => {
                  props.onChange(e, props.modalKey);
                }}
              />
              <label className="radio-inline mar-r-30" key={"ll" + o.key}>
                {o.label}
              </label>
            </React.Fragment>
          );
        })}
      </div>
    </React.Fragment>
  );
};

Radio.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.funcion,
  label: PropTypes.string
};
export default Radio;
