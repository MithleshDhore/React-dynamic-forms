import React from "react";
import PropTypes from "prop-types";

const TextArea = props => {
  return (
    <React.Fragment>
      <label key={"l" + props.key} htmlFor={props.key}>
        {props.label}
      </label>
      <textarea
        className={props.className}
        key={props.key}
        name={props.name}
        value={props.value}
        rows={props.rows}
        cols={props.cols}
        onChange={e => {
          props.onChange(e, props.modalKey, props.answerType);
        }}
      />
    </React.Fragment>
  );
};

TextArea.propTypes = {
  name: PropTypes.string,
  key: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string
};

export default TextArea;
