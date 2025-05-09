import React from "react";
import "./input.css";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = (props: IInputProps) => {
  return (
    <>
      <div className="input">
        <label htmlFor={props.label}>{props.label}</label>
        <input
          id={props.label}
          onChange={props.onChange}
          value={props.value}
          {...props}
        />
      </div>
    </>
  );
};

export default Input;
