import { useMutation } from "@tanstack/react-query";

type fetchDetails = {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | undefined;
  body?: object;
};

export function useApiFetch() {
  const mutationFn = async ({ method, endpoint, body }: fetchDetails) => {
    try {
      const url = `${import.meta.env.BACKEND_API_URL ?? "http://localhost:3000"}/${endpoint}`;
      const fetchOptions: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      };
      const response = await fetch(url, fetchOptions);
      const data = await response.json();

      if (response.status == 406) {
        throw { status: response.status, message: data.message };
      }
      if (!response.ok) {
        throw data;
      } else {
        data.ok = response.ok;
        data.status = response.status;
        return data;
      }
    } catch (err) {
      console.error(err);
      return err;
    }
  };
  const mutation = useMutation({ mutationFn });
  return { ...mutation, sendRequest: mutation.mutateAsync };
}
