import React, { Suspense, useState } from "react";
import { MainMenu } from "../../components/menu";
import { Loading } from "../loading";
import { useAuth } from "../../hooks";

export function Dashboard() {
  const [frame, setFrame] = useState("none");
  const user = useAuth();
  console.log(user);
  return (
    <Suspense fallback=<Loading />>
      <main>
        <nav>
          <MainMenu
            OptionUseState={{ state: frame, setState: setFrame }}
            options={[
              { label: "Menu 1" },
              { label: "Menu 2", icon: "XIcon" },
              { label: "Menu 3" },
            ]}
          />
        </nav>
        <p>{user?.name}</p>
      </main>
    </Suspense>
  );
}
