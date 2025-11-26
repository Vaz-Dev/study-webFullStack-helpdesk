import React, { useState } from "react";
import { MainMenu, UserMenu } from ".";
import type { UserAuthData } from "../../types/UserData.type";

type Props = React.ComponentProps<"nav"> & {
  userAuthData: UserAuthData;
  frameUseState: {
    state: string;
    setState: React.Dispatch<React.SetStateAction<string>>;
  };
};

export function DashboardNav({ userAuthData, frameUseState, ...props }: Props) {
  const { state: frame, setState: setFrame } = frameUseState;
  const [menuToggled, setMenuToggle] = useState("none");
  const styles = props.className;
  delete props.className;

  return (
    <nav
      className={
        "flex md:flex-col justify-between items-stretch p-6 md:p-0 md:w-max" +
        " " +
        styles
      }
    >
      <div className="flex gap-4 md:gap-0 md:flex-col-reverse md:h-full md:w-max">
        <MainMenu
          OptionUseState={{ state: frame, setState: setFrame }}
          options={[
            { label: "Menu 1" },
            { label: "Menu 2", icon: "XIcon" },
            { label: "Menu 3" },
          ]}
          toggleUseState={{ state: menuToggled, setState: setMenuToggle }}
        />
        <div
          id="dashboard-logo"
          className="font-bold text-2xl flex gap-3 md:pt-6 md:pb-6 md:pr-5 md:pl-5 cursor-default"
        >
          <img src="src/assets/img/Logo_IconDark.svg" className="size-10"></img>
          <div className="flex flex-col gap-0">
            <h1 className="self-center text-gray-600 text-xl">HelpDesk</h1>
            <label className="uppercase text-[10px] text-blue-light">
              {userAuthData.role}
            </label>
          </div>
        </div>
      </div>
      <UserMenu
        userAuthData={userAuthData}
        menuUseState={{ state: menuToggled, setState: setMenuToggle }}
      />
    </nav>
  );
}
