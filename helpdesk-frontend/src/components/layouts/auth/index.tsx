import { Outlet } from "react-router";

export function AuthLayout() {
  return (
    <main className="bg-[url(src/assets/img/Login_Background.png)] min-w-screen min-h-screen size-full bg-no-repeat bg-cover pt-8 flex flex-row-reverse md:pt-3">
      <section className="bg-gray-600 max-w-svw w-2xl rounded-t-2xl md:rounded-tr-none flex flex-col items-center gap-6 pt-8 pr-6 pl-6 md:pr-36 md:pl-36 md:pt-12">
        <div className="text-blue-dark font-bold text-2xl flex gap-3">
          <img src="src/assets/img/Logo_IconDark.svg" className="size-10"></img>
          <h1 className="self-center">HelpDesk</h1>
        </div>
        <Outlet />
      </section>
    </main>
  );
}
