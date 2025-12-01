import { useState } from "react";

type Props = React.ComponentProps<"input"> & {
  formName: string;
  checkInput: (id: string) => InputFeedback;
};

export type InputFeedback = {
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
  const [inputInfo, setInputInfo] = useState<undefined | InputFeedback>(
    undefined,
  );
  let inputInfoElement;

  function changeEvent(): void {
    setInputInfo(checkInput(`${formName}_${inputName}_input`));
  }

  if (inputInfo && inputInfo.message) {
    inputInfoElement = (
      <p
        className={
          inputInfo.error
            ? " text-feedback-danger italic text-xs"
            : " text-gray-400 italic text-xs"
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
        className={`${inputInfo?.error ? "text-feedback-danger uppercase text-[10px]" : "text-gray-300 peer-focus/input:text-feedback-progress uppercase text-[10px]"}`}
      >
        {inputName}
      </label>
      <input
        required
        name={inputName}
        id={`${formName}_${inputName}_input`}
        form={`${formName}_form`}
        type={type}
        placeholder={placeholder}
        className={`${inputInfo?.error ? "border-feedback-danger  placeholder:text-gray-400 border-b pb-1 peer/input pt-1 outline-0" : "border-gray-500 focus:border-feedback-progress  placeholder:text-gray-400 border-b pb-1 peer pt-1 outline-0"}`}
        onChange={changeEvent}
        formNoValidate
        {...props}
      ></input>
      {inputInfoElement}
    </div>
  );
}
