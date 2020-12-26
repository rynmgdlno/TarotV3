import React from 'react';
import PropTypes from 'prop-types';
import './form-input.scss'

const FormInput = ({
  name,
  type,
  placeholder,
  className,
  value,
  error,
  children,
  label,
  searchActive,
  // onChange,
  ...props
}) => {
  
  return (
    <React.Fragment>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        {...props}
        className={` ${searchActive}`}
        style={error && {border: 'solid 1px red'}}
      />
      { error && <p>{ error }</p>}
    </React.Fragment>
  )
}

FormInput.defaultProps = {
  type: "text",
  className: ""
}

FormInput.propTypes = {
  // name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'number', 'password']),
  className: PropTypes.string,
  value: PropTypes.any,
  // onChange: PropTypes.func.isRequired
}

export default FormInput;