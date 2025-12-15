import { useQuery } from "@tanstack/react-query";
import type { UserAuthData } from "../types/UserData.type";

export function useAuth(): UserAuthData | undefined {
  const { data } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.BACKEND_API_URL ?? "http://localhost:3000"}/auth/check`,
        {
          credentials: "include",
        },
      );
      const data = await response.json();
      if (!response.ok || !data.role || !data.name || !data.email) {
        throw { status: response.status, message: data.message };
      }
      return data;
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 5000,
  });
  return data;
}
