import { useNavigate } from "react-router";
import { CustomForm } from "../../components/form/customForm";

export function Login() {
  const navigate = useNavigate();
  const Form = CustomForm({
    name: "login",
    title: "Acesse o portal",
    subtitle: "Entre usando seu e-mail e senha cadastrados",
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
  return <div className="flex flex-col gap-3 max-w-[400px] w-full">{Form}</div>;
}

//   return (
//     <div className="flex flex-col gap-3 max-w-[400px] w-full">
//       <form
//         action={login}
//         className="flex flex-col p-6 border-gray-500 border rounded-2xl gap-8"
//       >
//         <div>
//           <h2 className="text-xl bold">Acesse o portal</h2>
//           <p className="text-gray-300 text-xs">
//             Entre usando seu e-mail e senha cadastrados
//           </p>
//         </div>
//         <div className="flex flex-col gap-4">
//           <div className="flex flex-col">
//             <label
//               htmlFor="email"
//               className="uppercase text-[10px] text-gray-300"
//             >
//               E-mail
//             </label>
//             <input
//               required
//               name="email"
//               id="login_email_input"
//               type="email"
//               placeholder="exemplo@email.com"
//               className="placeholder:text-gray-400 border-b border-gray-500 pb-1 pt-1 outline-0"
//               onChange={checkForm}
//             ></input>
//           </div>
//           <div className="flex flex-col">
//             <label
//               htmlFor="password"
//               className="uppercase text-[10px] text-gray-300"
//             >
//               Senha
//             </label>
//             <input
//               required
//               name="password"
//               id="login_password_input"
//               type="password"
//               placeholder="Digite sua senha"
//               className="placeholder:text-gray-400 border-b border-gray-500 pb-1 pt-1 outline-0"
//               onChange={checkForm}
//             ></input>
//           </div>
//         </div>
//         <div className="flex flex-col gap-2">
//           {alert}
//           <button
//             className="bg-gray-100 pt-2.5 pb-2.5 hover:bg-gray-200 cursor-pointer font-bold text-gray-600 rounded-md transition"
//             type="submit"
//             id="login_submit_button"
//             onClick={checkForm}
//           >
//             Entrar
//           </button>
//         </div>
//       </form>
//       <div className="flex flex-col p-6 border-gray-500 border rounded-2xl gap-5">
//         <div>
//           <h3 className="text-base bold">Ainda não tem uma conta?</h3>
//           <p className="text-gray-300 text-xs">Cadastre agora mesmo</p>
//         </div>
//         <button
//           className="bg-gray-500 pt-2.5 pb-2.5 hover:bg-gray-400 cursor-pointer font-bold rounded-md transition"
//           onClick={navigateRegister}
//         >
//           Criar conta
//         </button>
//       </div>
//     </div>
//   );
// }
