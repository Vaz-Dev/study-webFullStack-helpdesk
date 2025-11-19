import { useNavigate } from "react-router";
import { Alert } from "../../components/alert";
import { useState } from "react";

export function Login() {
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
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
    <div className="flex flex-col gap-3 max-w-[400px] w-full text-gree">
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
              name="email"
              type="email"
              placeholder="examplo@email.com"
              className="placeholder:text-gray-400 border-b border-gray-500 pb-1 pt-1 outline-0"
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
              type="password"
              placeholder="Digite sua senha"
              className="placeholder:text-gray-400 border-b border-gray-500 pb-1 pt-1 outline-0"
            ></input>
          </div>
        </div>
        {alert}
        <button
          className="bg-gray-100 pt-2.5 pb-2.5 hover:bg-gray-200 cursor-pointer font-bold text-gray-600 rounded-md transition"
          type="submit"
        >
          Entrar
        </button>
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
