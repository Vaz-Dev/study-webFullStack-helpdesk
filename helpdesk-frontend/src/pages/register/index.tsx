import { useState } from "react";
import { useNavigate } from "react-router";
import { Alert } from "../../components/alert";

export function Register() {
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  function navigateLogin() {
    navigate("/entrar");
  }
  function checkForm() {
    const nameInput = document.getElementById(
      "register_name_input",
    ) as HTMLInputElement;
    const emailInput = document.getElementById(
      "register_email_input",
    ) as HTMLInputElement;
    const passwordInput = document.getElementById(
      "register_password_input",
    ) as HTMLInputElement;
    const submitButton = document.getElementById(
      "register_submit_button",
    ) as HTMLButtonElement;
    const nameValue = nameInput.value;
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;
    if (emailValue || emailRegex.test(emailValue)) {
      emailInput.classList.remove("border-red-700");
      submitButton.classList.remove("pointer-events-none");
      submitButton.classList.remove("opacity-50");
    }
    if (passwordValue) {
      passwordInput.classList.remove("border-red-700");
      submitButton.classList.remove("pointer-events-none");
      submitButton.classList.remove("opacity-50");
    }
    if (nameValue) {
      nameInput.classList.remove("border-red-700");
      submitButton.classList.remove("pointer-events-none");
      submitButton.classList.remove("opacity-50");
    }
    if (passwordValue.length < 6) {
      passwordInput.classList.add("border-red-700");
      submitButton.classList.add("pointer-events-none");
      submitButton.classList.add("opacity-50");
    }
    if (nameValue.length < 5) {
      nameInput.classList.add("border-red-700");
      submitButton.classList.add("pointer-events-none");
      submitButton.classList.add("opacity-50");
    }
    if (!emailValue || !emailRegex.test(emailValue)) {
      emailInput.classList.add("border-red-700");
      submitButton.classList.add("pointer-events-none");
      submitButton.classList.add("opacity-50");
    }
  }
  async function register(formData): Promise<void> {
    try {
      const email = formData.get("email");
      const password = formData.get("password");
      const name = formData.get("name");
      if (!emailRegex.test(email)) {
        setAlert(Alert("Insira um email valido"));
        return;
      }
      if (password.length < 6) {
        setAlert(Alert("Insira uma senha com pelo menos 6 caracteres."));
        return;
      }
      if (name.length < 5) {
        setAlert(
          Alert("Insira um nome de usuário com pelo menos 5 caracteres."),
        );
        return;
      }
      const response = await fetch(
        `${import.meta.env.BACKEND_API_URL ?? "http://localhost:3000"}/user/client`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: email,
            password: password,
            name: name,
          }),
        },
      );
      const json = await response.json();
      if (response.ok) {
        setAlert(Alert(json.message, "success"));
        navigate("/painel");
      } else {
        setAlert(Alert(json.message, "failed"));
      }
    } catch (err) {
      console.error(`Erro no login: ${err}`);
    }
  }
  return (
    <div className="flex flex-col gap-3 max-w-[400px] w-full">
      <form
        action={register}
        className="flex flex-col p-6 border-gray-500 border rounded-2xl gap-8"
      >
        <div>
          <h2 className="text-xl bold">Crie sua conta</h2>
          <p className="text-gray-300 text-xs">
            Informe seu nome, e-mail e senha
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="uppercase text-[10px] text-gray-300"
            >
              Nome
            </label>
            <input
              name="name"
              type="text"
              id="register_name_input"
              placeholder="Digite o nome completo"
              className="placeholder:text-gray-400 border-b border-gray-500 pb-1 pt-1 outline-0"
              onChange={checkForm}
              required
            ></input>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="uppercase text-[10px] text-gray-300"
            >
              E-mail
            </label>
            <input
              name="email"
              type="email"
              id="register_email_input"
              placeholder="examplo@email.com"
              className="placeholder:text-gray-400 border-b border-gray-500 pb-1 pt-1 outline-0"
              onChange={checkForm}
              required
            ></input>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="uppercase text-[10px] text-gray-300"
            >
              Senha
            </label>
            <input
              name="password"
              id="register_password_input"
              type="password"
              placeholder="Digite sua senha"
              className="placeholder:text-gray-400 border-b border-gray-500 pb-1 pt-1 outline-0"
              onChange={checkForm}
              required
            ></input>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {alert}
          <button
            className="bg-gray-100 pt-2.5 pb-2.5 hover:bg-gray-200 cursor-pointer font-bold text-gray-600 rounded-md transition"
            type="submit"
            id="register_submit_button"
            onClick={checkForm}
          >
            Cadastrar
          </button>
        </div>
      </form>
      <div className="flex flex-col p-6 border-gray-500 border rounded-2xl gap-5">
        <div>
          <h3 className="text-base bold">Já tem uma conta?</h3>
          <p className="text-gray-300 text-xs">Entre agora mesmo</p>
        </div>
        <button
          className="bg-gray-500 pt-2.5 pb-2.5 hover:bg-gray-400 cursor-pointer font-bold rounded-md transition"
          onClick={navigateLogin}
        >
          Acessar conta
        </button>
      </div>
    </div>
  );
}
