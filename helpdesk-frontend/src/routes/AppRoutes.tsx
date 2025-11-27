import { Route } from "react-router";
import { AuthLayout } from "../components/layouts";
import { Login, Register, Dashboard } from "../pages";
import { RouteRules } from "./RouteRules";

export function AppRoutes() {
  return (
    <RouteRules>
      <Route element={<AuthLayout />}>
        <Route path="/entrar" index element={<Login />} />
        <Route path="/cadastrar" index element={<Register />} />
      </Route>

      <Route path="/painel" element=<Dashboard /> />
    </RouteRules>
  );
}
