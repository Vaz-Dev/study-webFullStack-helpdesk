import { useNavigate } from "react-router";
import { CustomForm } from "../../components/form/customForm";

export function Login() {
  const navigate = useNavigate();
  const navigateRegister = () => navigate("/cadastrar");
  const Form = CustomForm({
    name: "login",
    title: "Acesse o portal",
    subtitle: "Entre usando seu e-mail e senha cadastrados",
    submitButtonText: "Entrar",
    inputs: [
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
      endpoint: "auth/login",
      method: "POST",
      onSuccess: () => navigate("/painel"),
    },
  });
  return (
    <div className="flex flex-col gap-3 max-w-[400px] w-full">
      {Form}
      <div className="flex flex-col p-6 border-gray-500 border rounded-2xl gap-5">
        <div>
          <h3 className="text-base bold">Ainda não tem uma conta?</h3>
          <p className="text-gray-300 text-xs">Cadastre agora mesmo</p>
        </div>
        <button
          className="bg-gray-500 pt-2.5 pb-2.5 hover:bg-blue-200 cursor-pointer font-bold rounded-md transition"
          onClick={navigateRegister}
        >
          Criar conta
        </button>
      </div>
    </div>
  );
}
