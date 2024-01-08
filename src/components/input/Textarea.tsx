import React, { FC } from "react";
import { Control, useController } from "react-hook-form";
import classNames from "../../utils/classNames";

type TexareaProps = {
  className?: string;
  control: Control<any>;
  name: string;
  placeholder?: string;
  rest?: React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >;
};

const Textarea: FC<TexareaProps> = ({
  className = "",
  control,
  name,
  placeholder = "",
  ...rest
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name, defaultValue: "" });
  return (
    <div className="relative">
      <textarea
        autoComplete="off"
        // name={name}
        className={classNames(
          "text-sm font-medium placeholder:text-text4 py-[15px] px-[25px] rounded-[10px] border border-solid w-full bg-inherit peer dark:placeholder:text-text2 resize-none min-h-[140px]",
          error?.message
            ? "border-error text-error"
            : "border-strock dark:border-dark-strock text-text1 dark:text-white",
          className
        )}
        placeholder={placeholder}
        id={name}
        {...rest}
        {...field}
      />
      {error?.message && (
        <div className="peer-focus:hidden w-full font-medium text-error absolute pointer-events-none py-[15px] px-[25px] top-0 left-0">
          <p className="text-sm bg-white dark:bg-dark-secondary">
            {error?.message}
          </p>
        </div>
      )}
    </div>
  );
};
export default Textarea;
