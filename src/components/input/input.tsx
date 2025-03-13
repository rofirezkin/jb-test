import { ArrowUpIcon } from "@/lib/svg/arrow-up";
import React, { forwardRef } from "react";

type InputProps = {
  disabledButton?: boolean;
  error?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <div>
      <div className="border border-white rounded-2xl flex w-full items-center focus:border-green-50 ">
        <input
          ref={ref}
          type="text"
          className="p-3 text-white  text-lg  w-full decoration-0 focus:outline-none"
          placeholder="Enter your response..."
          autoFocus
          {...props}
        />
        <button
          onClick={props.onClick}
          disabled={props.disabledButton}
          className="bg-gray-600 p-[7px] rounded-2xl mr-3 focus:border-2 focus:cursor-pointer"
        >
          <ArrowUpIcon />
        </button>
      </div>
      <p className="text-red-600">{props.error}</p>
    </div>
  );
});

Input.displayName = "Input";

export default Input;
