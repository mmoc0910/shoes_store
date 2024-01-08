import { Link, LinkProps } from "react-router-dom";
import classNames from "../../utils/classNames";
import React, { FC } from "react";

type ButtonProps = {
  children: React.ReactNode;
  type: "button" | "submit" | "reset" | undefined;
  className?: string;
  href?: string;
  rest?:
    | React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
      >
    | React.ForwardRefExoticComponent<
        LinkProps & React.RefAttributes<HTMLAnchorElement>
      >;
};

const Button: FC<ButtonProps> = ({
  children,
  type = "button",
  className = "text-white",
  href,
  ...rest
}) => {
  if (href)
    return (
      <Link
        to={href}
        type={type}
        className={classNames(
          "font-semibold lg:py-3 rounded-[10px] lg:min-h-[52px] flex items-center justify-center select-none text-sm lg:text-base min-h-[40px] py-2",
          className
        )}
        {...rest}
      >
        {children}
      </Link>
    );
  return (
    <button
      type={type}
      className={classNames(
        "font-semibold lg:py-3 rounded-[10px] lg:min-h-[52px] flex items-center justify-center select-none text-sm lg:text-base min-h-[40px] py-2",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
