import type React from "react";
import { type InputFeedback, CustomInput } from "./customInput";
type InputData = React.ComponentProps<"input">;

type Props = Omit<React.ComponentProps<"form">, "name"> & {
  inputs: InputData[];
  name: string;
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

export function CustomForm({ inputs, name, ...props }: Props) {

  const inputElements = inputs.map((inputData: InputData) => {
    const inputElement = (
      <CustomInput formName={name} checkInput={checkInput} {...inputData} />
    );
    return inputElement;
  });

const checkAllInputs() {
  let error = false;
  for (const input of inputs) {
    checkInput(`${name}_${input.name}_input`)
    // todo
  }
}

  return <form {...props}>{...inputElements}</form>;
}
