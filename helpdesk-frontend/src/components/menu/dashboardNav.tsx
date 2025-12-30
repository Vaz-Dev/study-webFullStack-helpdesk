import React, { useState } from "react";
import { MainMenu, UserMenu } from ".";
import type { UserAuthData } from "../../types/UserData.type";
import { useDesktopOnly } from "../../hooks";
import type { PopupHandler } from "../../types/PopupHandler.type";

type Props = React.ComponentProps<"nav"> & {
  userAuthData: UserAuthData;
  frameUseState: {
    state: string;
    setState: React.Dispatch<React.SetStateAction<string>>;
  };
  popupHandler: PopupHandler;
};

export function DashboardNav({
  userAuthData,
  frameUseState,
  popupHandler,
  ...props
}: Props) {
  const { state: frame, setState: setFrame } = frameUseState;
  const [menuToggled, setMenuToggle] = useState("none");
  const [isNavResized, setNavResized] = useState(false);
  const styles = props.className;
  const isDesktop = useDesktopOnly();
  const navResized = isDesktop ? isNavResized : false;

  delete props.className;

  function navResize() {
    if (isDesktop) {
      setNavResized(!navResized);
    }
  }

  return (
    <nav
      className={
        "flex md:flex-col justify-between items-stretch p-6 md:p-0 md:w-max" +
        " " +
        styles
      }
    >
      <div
        className={
          navResized
            ? "flex gap-4 md:gap-0 md:flex-col-reverse md:h-full md:w-full md:min-w-0 transition-all"
            : "flex gap-4 md:gap-0 md:flex-col-reverse md:h-full md:w-full md:min-w-[200px]"
        }
      >
        <MainMenu
          navResized={navResized}
          OptionUseState={{ state: frame, setState: setFrame }}
          options={userAuthData.menuFrames}
          toggleUseState={{ state: menuToggled, setState: setMenuToggle }}
        />
        <div
          id="dashboard-logo"
          className={
            navResized
              ? "font-bold text-2xl flex gap-3 md:pt-6 md:pb-6 md:pr-5 md:pl-5 md:self-center cursor-default md:cursor-e-resize"
              : "font-bold text-2xl flex gap-3 md:pt-6 md:pb-6 md:pr-5 md:pl-5 md:self-center cursor-default md:cursor-w-resize"
          }
          onClick={navResize}
        >
          <img src="src/assets/img/Logo_IconDark.svg" className="size-10"></img>
          <div className={navResized ? "hidden" : "flex flex-col gap-0"}>
            <h1 className="self-center text-gray-600 text-xl">HelpDesk</h1>
            <label className="uppercase text-[10px] text-blue-light">
              {userAuthData.role}
            </label>
          </div>
        </div>
      </div>
      <UserMenu
        navResized={navResized}
        userAuthData={userAuthData}
        menuUseState={{ state: menuToggled, setState: setMenuToggle }}
        popupHandler={popupHandler}
      />
    </nav>
  );
}
