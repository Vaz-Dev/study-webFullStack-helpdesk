import { useNavigate } from "react-router";

export function Register() {
  const navigate = useNavigate();
  function navigateLogin() {
    navigate("/entrar");
  }
  async function register(formData) {
    try {
      const email = formData.get("email");
      const password = formData.get("password");
      const name = formData.get("name");
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
      if (response.ok) {
        // todo use alerts
        navigate("/painel");
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
              placeholder="Digite o nome completo"
              className="placeholder:text-gray-400 border-b border-gray-500 pb-1 pt-1 outline-0"
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
        <button
          className="bg-gray-100 pt-2.5 pb-2.5 hover:bg-gray-200 cursor-pointer font-bold text-gray-600 rounded-md transition"
          type="submit"
        >
          Cadastrar
        </button>
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
