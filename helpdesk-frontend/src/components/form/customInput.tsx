import type { ChangeEvent } from "react";

type Props = React.ComponentProps<"input"> & {
  formName: string;
  checkInput: (id: string) => inputInfo;
};

type inputInfo = {
  message: string;
  error: boolean;
};

export function CustomInput({
  name: inputName,
  formName,
  type,
  placeholder,
  checkInput,
  ...props
}: Props) {
  let inputInfo: undefined | inputInfo;
  let inputInfoElement;

  function changeEvent(): void {
    inputInfo = checkInput(`{${formName}_${inputName}_input`);
  }

  if (inputInfo) {
    inputInfoElement = (
      <p
        className={
          "italic text-xs" + inputInfo.error
            ? " text-feedback-danger"
            : " text-gray-400"
        }
      >
        {inputInfo.message}
      </p>
    );
  }

  return (
    <div className="flex flex-col">
      <label
        htmlFor={`${formName}_${inputName}_input`}
        className="uppercase text-[10px] text-gray-300"
      >
        {inputName}
      </label>
      <input
        required
        name={inputName}
        id={`${formName}_${inputName}_input`}
        type={type}
        placeholder={placeholder}
        className="placeholder:text-gray-400 border-b border-gray-500 pb-1 pt-1 outline-0"
        onChange={changeEvent}
        {...props}
      ></input>
      {inputInfoElement}
    </div>
  );
}
