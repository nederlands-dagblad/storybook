import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: any,
  setValue: (value: any) => any,
  label?: string,
  help?: string,
  errors?: string[]|null
}

export const Input: React.FC<InputProps> = (props) => {

  const {label, help, errors } = props;

  function onChange(e) {
    props.setValue(e.target.value);
  }

  return (
    <div className="nd-form-group">

      {label && <label className="label">{label}</label>}

      <input
        className="nd-form-input"
        onChange={onChange}
        {...props}
      />

      {help && <span className="help">{help}</span>}

      {errors && errors.map((error, i) => (
        <span key={i} className="error">{error}</span>
      ))}
    </div>
  );
};

export default Input;
