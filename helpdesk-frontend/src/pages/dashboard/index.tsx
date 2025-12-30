import { useRef, useState, type ReactElement } from "react";
import { useAuth } from "../../hooks";
import { DashboardNav } from "../../components/menu";
import { CustomPopup } from "../../components/popup";
import type { PopupHandler } from "../../types/PopupHandler.type";

export function Dashboard() {
  const [frame, setFrame] = useState("none");

  const userToken = useAuth();
  if (!userToken) {
    throw new Error("user is undefined");
  }

  const popupRef = useRef<HTMLDialogElement | null>(null);
  const [popupContent, setPopupContent] = useState<{
    title: string | null;
    body: ReactElement | null;
  }>({ title: null, body: null });
  const popupHandler: PopupHandler = { ref: popupRef, set: setPopupContent };

  return (
    <main className="bg-gray-100 flex flex-col md:flex-row min-w-screen min-h-screen size-full md:pt-3">
      <DashboardNav
        userAuthData={userToken}
        frameUseState={{ state: frame, setState: setFrame }}
        popupHandler={popupHandler}
      />
      <section className="bg-gray-600 rounded-t-2xl size-full grow p-6 md:p-12 pt-7 md:pt-14 md:min-h-[calc(100vh-12px)] md:rounded-tr-none">
        <h1 className="text-2xl text-blue-dark">
          {frame == "none" ? "Dashboard" : frame}
        </h1>
      </section>
      <CustomPopup
        title={popupContent.title!}
        ref={popupRef}
        selfRef={popupRef}
      >
        {popupContent.body!}
      </CustomPopup>
    </main>
  );
}
