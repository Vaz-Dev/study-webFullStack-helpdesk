import { useQuery } from "@tanstack/react-query";

export function useFetchAPI({
  endpoint,
  method,
  body,
}: {
  endpoint: string;
  method: string | undefined;
  body: object | undefined;
}): object[] | object {
  const { data } = useQuery({
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.BACKEND_API_URL ?? "http://localhost:3000"}/${endpoint}`,
        {
          method: `${method ?? "GET"}`,
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(body),
        },
      );
      const data = await response.json();
      if (response.status == 406) {
        throw { code: "UNAUTHORIZED", message: data.message };
      }
      data.ok = response.ok;
      data.status = response.status;
      return data;
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 5000,
  });
  return data;
}
