import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useAuth(): { name: string; role: string } | undefined {
  const navigate = useNavigate();
  const { data } = useSuspenseQuery({
    queryKey: ["useAuthQuery"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.BACKEND_API_URL ?? "http://localhost:3000"}/auth/check`,
      );
      return response.json();
    },
    retry: false,
  });
  useEffect(() => {
    if (!data.role || !data.name) {
      // If data does not return a role or name, the user is not logged in.
      console.error(data.message);
      navigate("/entrar", { replace: true });
    }
  }, [status, navigate]);
  if (data.name && data.role) {
    return data;
  }
}
