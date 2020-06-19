import * as React from "react";
import Form from "react-bootstrap/Form";

class Input extends React.Component{
  render() {
    const { label, placeholder, name, type, isInvalid, isValid, onKeyDown, onChange, errors} = this.props;
    return (
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          placeholder={placeholder}
          name={name}
          size="lg"
          type={type}
          isInvalid={isInvalid}
          isValid={isValid}
          onKeyDown={onKeyDown}
          onChange={onChange}/>
        <Form.Control.Feedback type="invalid">
          {errors}
        </Form.Control.Feedback>
      </Form.Group>
    )
  }
}

export default Input;

Input.defaultProps = {
  isValid: "",
};
