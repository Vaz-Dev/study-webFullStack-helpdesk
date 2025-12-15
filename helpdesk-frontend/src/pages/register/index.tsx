import { useNavigate } from "react-router";
import { CustomForm } from "../../components/form/customForm";

export function Register() {
  const navigate = useNavigate();
  const navigateLogin = () => navigate("/entrar");
  const Form = CustomForm({
    name: "register",
    title: "Crie sua conta",
    subtitle: "Informe seu nome, e-mail e senha",
    submitButtonText: "Cadastrar",
    inputs: [
      {
        name: "name",
        type: "text",
        required: true,
        placeholder: "Insira seu nome",
      },
      {
        name: "email",
        type: "email",
        required: true,
        placeholder: "exemplo@email.com",
      },
      {
        name: "password",
        type: "password",
        required: true,
        placeholder: "Insira sua senha",
      },
    ],
    fetch: {
      endpoint: "user/client",
      method: "POST",
      onSuccess: () => navigate("/entrar"),
    },
  });
  return (
    <div className="flex flex-col gap-3 max-w-[400px] w-full">
      {Form}
      <div className="flex flex-col p-6 border-gray-500 border rounded-2xl gap-5">
        <div>
          <h3 className="text-base bold">Já uma conta?</h3>
          <p className="text-gray-300 text-xs">Entre agora mesmo</p>
        </div>
        <button
          className="bg-gray-500 pt-2.5 pb-2.5 hover:bg-blue-200 cursor-pointer font-bold rounded-md transition"
          onClick={navigateLogin}
        >
          Criar conta
        </button>
      </div>
    </div>
  );
}
