import { useQuery } from "@tanstack/react-query";
// TODO: is not reading the cookie?
export function useAuth():
  | { name: string; role: string; email: string; pfp?: Blob }
  | undefined {
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
      if (!data.role || !data.name || !data.email) {
        throw { code: "UNAUTHORIZED", message: data.message };
      }
      return data;
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 5000,
  });
  return data;
}
