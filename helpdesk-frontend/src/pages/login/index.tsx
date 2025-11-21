import { useNavigate } from "react-router";
import { Alert } from "../../components/alert";
import { useState } from "react";

export function Login() {
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  function checkForm() {
    const emailInput = document.getElementById(
      "login_email_input",
    ) as HTMLInputElement;
    const passwordInput = document.getElementById(
      "login_password_input",
    ) as HTMLInputElement;
    const submitButton = document.getElementById(
      "login_submit_button",
    ) as HTMLButtonElement;
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
    if (!passwordValue) {
      passwordInput.classList.add("border-red-700");
      submitButton.classList.add("pointer-events-none");
      submitButton.classList.add("opacity-50");
    }
    if (!emailValue || !emailRegex.test(emailValue)) {
      emailInput.classList.add("border-red-700");
      submitButton.classList.add("pointer-events-none");
      submitButton.classList.add("opacity-50");
    }
  }
  async function login(formData) {
    try {
      const email = formData.get("email");
      const password = formData.get("password");
      const response = await fetch(
        `${import.meta.env.BACKEND_API_URL ?? "http://localhost:3000"}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: email,
            password: password,
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
  function navigateRegister() {
    navigate("/cadastrar");
  }
  return (
    <div className="flex flex-col gap-3 max-w-[400px] w-full">
      <form
        action={login}
        className="flex flex-col p-6 border-gray-500 border rounded-2xl gap-8"
      >
        <div>
          <h2 className="text-xl bold">Acesse o portal</h2>
          <p className="text-gray-300 text-xs">
            Entre usando seu e-mail e senha cadastrados
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="uppercase text-[10px] text-gray-300"
            >
              E-mail
            </label>
            <input
              required
              name="email"
              id="login_email_input"
              type="email"
              placeholder="examplo@email.com"
              className="placeholder:text-gray-400 border-b border-gray-500 pb-1 pt-1 outline-0"
              onChange={checkForm}
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
              required
              name="password"
              id="login_password_input"
              type="password"
              placeholder="Digite sua senha"
              className="placeholder:text-gray-400 border-b border-gray-500 pb-1 pt-1 outline-0"
              onChange={checkForm}
            ></input>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {alert}
          <button
            className="bg-gray-100 pt-2.5 pb-2.5 hover:bg-gray-200 cursor-pointer font-bold text-gray-600 rounded-md transition"
            type="submit"
            id="login_submit_button"
            onClick={checkForm}
          >
            Entrar
          </button>
        </div>
      </form>
      <div className="flex flex-col p-6 border-gray-500 border rounded-2xl gap-5">
        <div>
          <h3 className="text-base bold">Ainda não tem uma conta?</h3>
          <p className="text-gray-300 text-xs">Cadastre agora mesmo</p>
        </div>
        <button
          className="bg-gray-500 pt-2.5 pb-2.5 hover:bg-gray-400 cursor-pointer font-bold rounded-md transition"
          onClick={navigateRegister}
        >
          Criar conta
        </button>
      </div>
    </div>
  );
}
