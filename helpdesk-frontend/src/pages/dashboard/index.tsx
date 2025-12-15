import { useState } from "react";
import { useAuth } from "../../hooks";
import { DashboardNav } from "../../components/menu";

export function Dashboard() {
  const [frame, setFrame] = useState("none");
  const userToken = useAuth();
  if (!userToken) {
    throw new Error("user is undefined");
  }
  return (
    <main className="bg-gray-100 flex flex-col md:flex-row min-w-screen min-h-screen size-full md:pt-3">
      <DashboardNav
        userAuthData={userToken}
        frameUseState={{ state: frame, setState: setFrame }}
      />
      <section className="bg-gray-600 rounded-t-2xl size-full grow p-6 md:p-12 pt-7 md:pt-14 md:min-h-[calc(100vh-12px)] md:rounded-tr-none">
        <h1 className="text-2xl text-blue-dark">
          {frame == "none" ? "Dashboard" : frame}
        </h1>
      </section>
    </main>
  );
}
