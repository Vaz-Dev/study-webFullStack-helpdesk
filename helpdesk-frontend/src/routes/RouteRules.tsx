import { Component, useEffect, type ReactElement, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { Loading } from "../pages";
import { useQueryClient } from "@tanstack/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLocation, Routes, Route } from "react-router";
import { Suspense } from "react";
import { ErrorPage } from "../pages/error";

interface ErrorBoundaryProps {
  children: ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
  error: any;
}

export function RouteRules({ children }: { children: ReactElement[] }) {
  const location = useLocation();
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback=<Loading />>
        <ErrorBoundaryClass key={location.pathname}>
          <Routes>
            <Route path="/" index element={<RedirectMainRoute />} />
            {children}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </ErrorBoundaryClass>
      </Suspense>
    </QueryClientProvider>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      refetchOnWindowFocus: false,
    },
  },
});

export function RedirectMainRoute() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/painel", { replace: true });
  }, [navigate]);
  return <Loading />;
}

export function RedirectLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.removeQueries({ queryKey: ["session"] });
    navigate("/entrar", { replace: true });
  }, [navigate, queryClient]);
  return <Loading />;
}

// TODO fix infinite loop
export class ErrorBoundaryClass extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false, error: null };
  static getDerivedStateFromError(error: any): ErrorBoundaryState {
    return { hasError: true, error: error };
  }

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.state.error.code === "UNAUTHORIZED") {
        return <RedirectLogin />;
      }
    }
    return this.props.children;
  }
}
