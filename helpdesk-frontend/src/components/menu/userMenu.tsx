import type { UserAuthData } from "../../types/UserData.type";
import { MenuOption } from "./menu-option";

type Props = React.ComponentProps<"div"> & {
  userAuthData: UserAuthData;
  menuUseState: {
    state: string;
    setState: React.Dispatch<React.SetStateAction<string>>;
  };
};

export function UserMenu({ userAuthData, menuUseState, ...props }: Props) {
  const name = userAuthData.name;
  const email = userAuthData.email;
  const role = userAuthData.role;
  const pfp = userAuthData.pfp;
  const { state: menuToggled, setState: setMenuToggle } = menuUseState;
  // todo: hoist this useState to the nav, add feat so only one menu can be open at a time
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

  return (
    <div className="static md:relative md:pt-3 md:pb-3 md:pl-2">
      <button
        onClick={() => setMenuToggle(menuToggled == "user" ? "none" : "user")}
        className="flex gap-3 cursor-pointer md:hover:bg-gray-200 md:active:gap-2 md:active:pr-5 md:border border-transparent md:p-1 md:pr-4 md:rounded-full transition-all"
      >
        <div className="flex justify-center items-center size-10 rounded-full bg-blue-dark text-gray-600 text-sm">
          {bubbleContent}
        </div>
        <div className="flex-col items-baseline hidden md:flex">
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
        <MenuOption icon="UsersIcon" label="Perfil" />
        <MenuOption icon="LogoutIcon" label="Sair" className="text-red-600" />
      </menu>
    </div>
  );
}
