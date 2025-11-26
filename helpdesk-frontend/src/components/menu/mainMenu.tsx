import type React from "react";
import { MenuOption, type MenuOptionsProps } from "./menu-option";
import { MenuIcon, XIcon } from "../icons";
import { useDesktopOnly } from "../../hooks";

type Props = React.ComponentProps<"menu"> & {
  options: MenuOptionsProps[];
  OptionUseState: {
    state: string;
    setState: React.Dispatch<React.SetStateAction<string>>;
  };
  toggleUseState: {
    state: string;
    setState: React.Dispatch<React.SetStateAction<string>>;
  };
};

function MainMenuCore({
  options: options,
  OptionUseState: optionUseState,
  toggleUseState,
  ...props
}: Props) {
  const optionItems = [];
  let index = 0;
  for (const option of options) {
    index++;
    const optionData = option.label ?? `optionIndex${index}`;
    const isSelected =
      optionData == optionUseState.state ? { "data-selected": true } : null;

    optionItems.push(
      <MenuOption
        onClick={() => {
          optionUseState.setState(optionData);
          toggleUseState.setState("none");
        }}
        key={optionData}
        id={optionData}
        {...isSelected}
        {...option}
      />,
    );
  }
  return (
    <menu
      className="bg-gray-100 flex flex-col p-5 gap-4 rounded-xl m-2 absolute w-[calc(100%-16px)] top-[90px] left-0 md:left-auto md:static md:h-full md:border-b md:border-t md:border-gray-200 md:rounded-none md:pr-4 md:pl-4 md:m-0 md:w-auto"
      {...props}
    >
      <label className="text-[10px] font-bold uppercase text-gray-400 md:hidden">
        Menu
      </label>
      <div className="flex flex-col gap-1">{optionItems}</div>
    </menu>
  );
}

function MainMenuExport({
  options,
  OptionUseState,
  toggleUseState,
  ...props
}: Props) {
  const isDesktop = useDesktopOnly();
  const { state: menuToggled, setState: setMenuToggle } = toggleUseState;

  const mainMenu = MainMenuCore({
    options,
    OptionUseState,
    toggleUseState,
    ...props,
  });
  if (isDesktop) {
    return mainMenu;
  } else {
    const buttonIcon = menuToggled == "main" ? XIcon : MenuIcon;
    return (
      <div>
        <button
          className="cursor-pointer p-2.5 rounded-md bg-gray-200 text-gray-600 active:bg-blue-dark active:text-blue-dark transition"
          onClick={() => setMenuToggle(menuToggled == "main" ? "none" : "main")}
        >
          {buttonIcon({ className: "size-5" })}
        </button>
        {menuToggled == "main" ? mainMenu : null}
      </div>
    );
  }
}

export { MainMenuExport as MainMenu };
