import { useNavigate } from "react-router";
import { useApiFetch } from "../../hooks/useApiFetch";
import type { UserAuthData } from "../../types/UserData.type";
import { MenuOption } from "./menu-option";
import type { PopupHandler } from "../../types/PopupHandler.type";

type Props = React.ComponentProps<"div"> & {
  navResized: boolean;
  userAuthData: UserAuthData;
  menuUseState: {
    state: string;
    setState: React.Dispatch<React.SetStateAction<string>>;
  };
  popupHandler: PopupHandler;
};

export function UserMenu({
  userAuthData,
  menuUseState,
  navResized,
  popupHandler,
  ...props
}: Props) {
  const { sendRequest } = useApiFetch();
  const navigate = useNavigate();

  const name = userAuthData.name;
  const email = userAuthData.email;
  const pfp = userAuthData.pfp;

  const { state: menuToggled, setState: setMenuToggle } = menuUseState;
  const showNav = menuToggled == "user" ? "flex" : "hidden";

  let bubbleContent;
  if (!pfp) {
    const nameWords = name.toUpperCase().split(" ");
    const firstAndLastNameWords = [nameWords.shift() ?? "Error"];
    if (nameWords.length > 0) {
      firstAndLastNameWords.push(nameWords.pop() ?? "Error");
    }
    let chars = "";
    for (const word of firstAndLastNameWords) {
      chars += word[0];
    }
    bubbleContent = <p>{chars}</p>;
  } // todo: else { use pfp }

  async function logout() {
    const result = await sendRequest({
      endpoint: "auth/logout",
      method: "PATCH",
    });
    if (result) {
      navigate("/entrar");
    }
  }

  return (
    <div
      className="static md:relative md:pt-3 md:pb-5 md:pl-2 md:pr-2"
      {...props}
    >
      <button
        onClick={() => setMenuToggle(menuToggled == "user" ? "none" : "user")}
        className={
          navResized
            ? "flex gap-3 md:p-2 cursor-pointer border-transparent transition-all"
            : "flex gap-3 cursor-pointer md:hover:bg-gray-200 md:active:gap-2 md:active:pr-5 md:border border-transparent md:p-1 md:pr-4 md:rounded-full transition-all"
        }
      >
        <div className="flex justify-center items-center size-10 rounded-full bg-blue-dark text-gray-600 text-sm">
          {bubbleContent}
        </div>
        <div
          className={
            navResized ? "hidden" : "flex-col items-baseline hidden md:flex"
          }
        >
          <p className="text-sm text-gray-600">{name}</p>
          <p className="text-xs text-gray-400">{email}</p>
        </div>
      </button>
      <menu
        className={
          "bg-gray-100 flex-col p-5 gap-0.5 rounded-xl m-2 absolute w-[calc(100%-16px)] top-[90px] left-0 md:m-0 md:bottom-2 md:left-[calc(100%+8px)] md:w-xs md:top-auto" +
          " " +
          showNav
        }
      >
        <label className="text-[10px] font-bold uppercase text-gray-400 mb-4">
          Opções
        </label>
        <MenuOption
          icon="UsersIcon"
          label="Perfil"
          onClick={() => {
            if (popupHandler.ref.current) {
              const popup = popupHandler.ref.current;
              popupHandler.set({
                title: "Perfil",
                body: <div>TODO: Inserir perfil aqui</div>,
              });
              popup.showModal();
            } else {
              console.error("Componente CustomPopup não encontrado");
            }
          }}
        />
        <MenuOption
          icon="LogoutIcon"
          label="Sair"
          className="text-red-500 hover:text-red-600"
          onClick={() => {
            if (popupHandler.ref.current) {
              popupHandler.set({
                title: "Tem certeza que deseja sair?",
                body: (
                  <div className="flex flex-col gap-4">
                    <p>
                      Você vai precisar inserir seu email e senha para acessar o
                      painel novamente,{" "}
                      <b>
                        sair também ira desconectar sua conta de todos outros
                        dispositívos
                      </b>
                      .
                    </p>
                    <div className="flex justify-around gap-2">
                      <button
                        className="p-2 border-2 border-red-800 hover:bg-gray-500 bg-red-800 transition hover:text-red-800 text-gray-600 font-bold rounded-sm w-full cursor-pointer"
                        onClick={logout}
                      >
                        Sair
                      </button>
                      <button
                        className="p-2.5 bg-gray-500 hover:bg-gray-200 text-gray-100 hover:text-gray-600 transition rounded-sm w-full cursor-pointer"
                        onClick={() => popupHandler.ref.current?.close()}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ),
              });
              popupHandler.ref.current.showModal();
            } else {
              console.error("Componente CustomPopup não encontrado");
            }
          }}
        />
      </menu>
    </div>
  );
}
