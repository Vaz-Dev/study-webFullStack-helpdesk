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
        className={`uppercase text-[10px] ${inputInfo?.error ? "text-feedback-danger" : "text-gray-300 peer-focus:text-feedback-progress"}`}
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
        className={`placeholder:text-gray-400 border-b pb-1 peer pt-1 outline-0 ${inputInfo?.error ? "border-feedback-danger" : "border-gray-500 focus:border-feedback-progress"}`}
        onChange={changeEvent}
        formNoValidate
        {...props}
      ></input>
      {inputInfoElement}
    </div>
  );
}
