import React from "react";
import BaseInput from "./BaseInputField";
import "./NumberInputField.css"; // hide or style arrows

const NumberInputField: React.FC<React.ComponentProps<typeof BaseInput>> = (
  props
) => {
  return <BaseInput type="number" {...props} />;
};

export default NumberInputField;
