import React from "react";
import PropTypes from "prop-types";

const CheckBox = props => {
  props.options.sort((a, b) => a.rank - b.rank);
  return (
    <React.Fragment>
      <label key={"l" + props.key} htmlFor={props.key}>
        {props.label}
      </label>
      <div>
        {props.options.map(op => {
          let checked = false;
          if (props.setvalue && props.setvalue.length > 0) {
            checked = props.setvalue.indexOf(op.value) > -1 ? true : false;
          }
          return (
            <React.Fragment key={"cfr" + op.key}>
              <div className="col-md-12" style={{ paddingLeft: "0" }}>
                <input
                  className={props.className}
                  type={props.type}
                  name={op.name}
                  checked={checked}
                  value={op.value}
                  onChange={e => {
                    props.onChange(e, props.modalKey, "multiple");
                  }}
                />
                <label className="checkbox-inline mar-r-30" key={"ll" + op.key}>
                  {op.label}
                </label>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </React.Fragment>
  );
};

CheckBox.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.funcion,
  label: PropTypes.string
};
export default CheckBox;
