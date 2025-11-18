import { Routes, Route } from "react-router";
import { AuthLayout } from "../components/layouts";
import { Login, Register, Dashboard, Loading } from "../pages";
import { ErrorBoundaryClass, RedirectDashboard } from "./RouteRules";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { useLocation } from "react-router";

// import { Home } from "../pages/Home"
// import { NotFound } from "../pages/NotFound"
// import { Products } from "../pages/Products"
// import { Product } from "../pages/Product"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      refetchOnWindowFocus: false,
    },
  },
});

export function AppRoutes() {
  const location = useLocation();
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback=<Loading />>
        <ErrorBoundaryClass key={location.pathname}>
          <Routes>
            <Route path="/" index element={<RedirectDashboard />} />

            <Route path="/" element={<AuthLayout />}>
              <Route path="/entrar" index element={<Login />} />
              <Route path="/cadastrar" index element={<Register />} />
            </Route>

            <Route path="/painel" element=<Dashboard /> />
          </Routes>
        </ErrorBoundaryClass>
      </Suspense>
    </QueryClientProvider>
  );
}
