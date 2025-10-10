import React from "react";
import BaseInput from "./BaseInputField";
import "./NumberInputField.css"; // hide or style arrows
import { CaretDownIcon, CaretUpIcon } from "@phosphor-icons/react";

const NumberInputField: React.FC<React.ComponentProps<typeof BaseInput>> = (
  props
) => {
  const handleIncrease = () => {
    if (props.onChange && props.value !== undefined) {
      const newValue = Number(props.value) + 1;
      props.onChange({
        ...({} as React.ChangeEvent<HTMLInputElement>),
        target: { value: newValue.toString() },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };
  const handleDecrease = () => {
    if (props.onChange && props.value !== undefined) {
      const newValue = Number(props.value) - 1;
      props.onChange({
        ...({} as React.ChangeEvent<HTMLInputElement>),
        target: { value: newValue.toString() },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };
  return (
    <div className="relative">
      <BaseInput type="number" {...props} />
      <div className="absolute right-4 top-1/2 transform -translate-y-2/11 flex flex-col justify-between transition-colors duration-200">
        <button
          onClick={handleIncrease}
          type="button"
          className="cursor-pointer hover:text-orange-500"
        >
          <CaretUpIcon></CaretUpIcon>
        </button>
        <button
          onClick={handleDecrease}
          type="button"
          className="cursor-pointer hover:text-orange-500"
        >
          <CaretDownIcon></CaretDownIcon>
        </button>
      </div>
    </div>
  );
};

export default NumberInputField;
