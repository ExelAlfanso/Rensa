import React from "react";
import BaseInputField from "./BaseInputField";

const TextInput = (props: React.ComponentProps<typeof BaseInputField>) => {
  return <BaseInputField type="text" {...props} />;
};

export default TextInput;
