import type React from "react";
import { type InputFeedback, CustomInput } from "./customInput";
import { Alert } from "../alert";
import { useFetchAPI } from "../../hooks";
import { useState, type ReactElement } from "react";
type InputData = Omit<React.ComponentProps<"input">, "name"> & { name: string };

type Props = Omit<React.ComponentProps<"form">, "name"> & {
  inputs: InputData[];
  name: string;
  title?: string;
  subtitle?: string;
  fetch: {
    endpoint: string;
    method?: string;
    onSuccess?: Function;
  };
};

const checkInput = (id: string): InputFeedback => {
  const input: HTMLInputElement = document.getElementById(id);
  const validityState = input.validity;
  if (validityState.valueMissing) {
    return {
      error: true,
      message: `Preencha o campo ${input.getAttribute("name")}`,
    };
  } else if (validityState.tooShort) {
    return {
      error: true,
      message: `Campo ${input.getAttribute("name")} deve ter pelo menos ${input.minLength} caracteres`,
    };
  } else if (validityState.tooLong) {
    return {
      error: true,
      message: `Campo ${input.getAttribute("name")} deve ter no máximo ${input.maxLength} caracteres`,
    };
  } else if (validityState.typeMismatch || validityState.patternMismatch) {
    return {
      error: true,
      message: `Campo ${input.getAttribute("name")} com valor inválido`,
    };
  } else {
    return { error: false, message: `` };
  }
};

export function CustomForm({
  inputs,
  name,
  fetch,
  title,
  subtitle,
  ...props
}: Props) {
  const [alert, setAlert] = useState<null | ReactElement>(null);

  const inputElements = inputs.map((inputData: InputData) => {
    const inputElement = (
      <CustomInput formName={name} checkInput={checkInput} {...inputData} />
    );
    return inputElement;
  });

  function submit(formData): void {
    let inputValues = {};
    let error = false;
    for (const input of inputs) {
      const inputStatus = checkInput(`${name}_${input.name}_input`);
      if (inputStatus.error) {
        error = true;
      } else if (!input.name) {
        throw new Error(`Unnamed form input`);
      } else {
        inputValues[input.name] = formData.get(input.name);
      }
    }
    if (error) {
      setAlert(Alert("Preencha os campos acima corretamente."));
    } else if (inputValues) {
      const result = useFetchAPI({
        endpoint: fetch.endpoint,
        method: fetch.method,
        body: inputValues,
      });
      if (result.ok && fetch.onSuccess) {
        fetch.onSuccess();
      } else if (!result.ok) {
        setAlert(Alert(`Ocorreu um erro: ${result.message}`, "failed"));
      }
    }
  }
  let titleDiv;
  if (title && subtitle) {
    titleDiv = (
      <div>
        <h2 className="text-xl bold">{title}</h2>
        <p className="text-gray-300 text-xs">{subtitle}</p>
      </div>
    );
  } else {
    titleDiv = null;
  }

  return (
    <form
      action={submit}
      {...props}
      className="flex flex-col p-6 border-gray-500 border rounded-2xl gap-8"
    >
      {titleDiv}
      {...inputElements}
      {alert}
      <button
        className="bg-gray-100 pt-2.5 pb-2.5 hover:bg-gray-200 cursor-pointer font-bold text-gray-600 rounded-md transition"
        type="submit"
        id={`${name}_submit_button`}
      >
        Entrar
      </button>
    </form>
  );
}
