import React, { FC } from "react";

interface ButtonProp {
  btnText: string;
  handleButtonClick?: any;
  customStyles?: string;
  disabled?: boolean;
}

const Button: FC<ButtonProp> = ({
  btnText,
  handleButtonClick,
  customStyles,
  disabled,
}) => {
  return (
    <button
      type="button"
      onClick={handleButtonClick}
      className={`${customStyles} p-3 rounded-lg shadow-md hover:bg-gray-700 transition border-none outline-none`}
      disabled={disabled}
    >
      {btnText}
    </button>
  );
};

export default Button;
