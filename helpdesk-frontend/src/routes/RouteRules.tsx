import { Component, useEffect, type ErrorInfo, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { Loading } from "../pages";
import { useQueryClient } from "@tanstack/react-query";

interface ErrorBoundaryProps {
  children: ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
  error: any;
}

export function RedirectDashboard() {
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
  }, [navigate]);
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
    console.log(this.state.hasError);
    if (this.state.hasError && this.state.error) {
      if (this.state.error.code === "UNAUTHORIZED") {
        return <RedirectLogin />;
      }
    }
    return this.props.children;
  }
}
