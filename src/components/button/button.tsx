import { cva } from "class-variance-authority";
import { JSX } from "react";

type Intent = "primary" | "primaryOutlined" | "white";

type Size = "small" | "large";

type ButtonVariantsProps = {
  intent?: Intent;
  size?: Size;
  fullwidth?: boolean;
};

type ButtonProps = ButtonVariantsProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonVariantsFunction = (props: ButtonVariantsProps) => string;

const ButtonVariants: ButtonVariantsFunction = cva(
  "transition-colors duration-300 ease-in-out cursor-pointer  disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none uppercase rounded-xl",
  {
    variants: {
      intent: {
        primary:
          "bg-[var(--button-color)] hover:bg-opacity-90 text-white hover:text-white active:outline active:outline-offset-2 active:outline-2 active:outline-blue-primary",
        primaryOutlined:
          "bg-transparent border-2 border-blue-primary text-blue-primary hover:bg-blue-primary hover:text-white active:outline active:outline-offset-2 active:outline-2 active:outline-blue-primary",
        white: "bg-white hover:bg-opacity-90 text-black hover:text-black  ",
      },
      size: {
        small: "text-s-regular px-3 py-1.5",
        large: "text-m-regular px-[28px] py-[13.5px]",
      },
      fullwidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "large",
      fullwidth: false,
    },
  }
);

export default function Button({
  intent,
  className,
  children,
  size,
  fullwidth,
  ...buttonProps
}: ButtonProps): JSX.Element {
  return (
    <button
      className={`${ButtonVariants({ intent, size, fullwidth })} ${className}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
