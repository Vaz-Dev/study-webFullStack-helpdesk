import type React from "react";
import { MainMenuOption, type MenuOptionsProps } from "./mainMenu-option";
import { MenuIcon, XIcon } from "../icons";
import { useState } from "react";
import { useDesktopOnly } from "../../hooks";

type Props = React.ComponentProps<"menu"> & {
  options: MenuOptionsProps[];
  OptionUseState: {
    state: string;
    setState: React.Dispatch<React.SetStateAction<string>>;
  };
};

function MainMenuCore({ options: options, OptionUseState, ...props }: Props) {
  const optionItems = [];
  let index = 0;
  for (const option of options) {
    index++;
    const optionData = option.label ?? `optionIndex${index}`;
    const isSelected =
      optionData == OptionUseState.state ? { "data-selected": true } : null;

    optionItems.push(
      <MainMenuOption
        onClick={() => OptionUseState.setState(optionData)}
        key={optionData}
        id={optionData}
        {...isSelected}
        {...option}
      />,
    );
  }
  return (
    <menu
      className="bg-gray-100 flex flex-col p-5 gap-4 rounded-xl m-2 absolute w-[calc(100%-16px)] top-32 md:relative md:rounded-none md:m-0 md:w-auto md:top-auto"
      {...props}
    >
      <label className="text-[10px] font-bold uppercase text-gray-400 md:hidden">
        Menu
      </label>
      <div className="flex flex-col gap-1">{optionItems}</div>
    </menu>
  );
}

function MainMenuExport({ options: options, OptionUseState, ...props }: Props) {
  const isDesktop = useDesktopOnly();
  const [menuToggled, setMenuToggle] = useState(false);

  const mainMenu = MainMenuCore({
    options: options,
    OptionUseState,
    ...props,
  });
  if (isDesktop) {
    return mainMenu;
  } else {
    const buttonIcon = menuToggled ? XIcon : MenuIcon;
    return (
      <div>
        <button
          className="cursor-pointer p-2.5 rounded-md bg-gray-100 text-gray-600 active:bg-blue-dark active:text-blue-dark transition"
          onClick={() => setMenuToggle(!menuToggled)}
        >
          {buttonIcon({ className: "size-5" })}
        </button>
        {menuToggled ? mainMenu : null}
      </div>
    );
  }
}

export { MainMenuExport as MainMenu };
