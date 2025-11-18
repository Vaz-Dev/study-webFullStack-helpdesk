export function Login() {
  async function login(formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    const response = await fetch(
      `${import.meta.env.BACKEND_API_URL ?? "http://localhost:3000"}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      },
    );
    // TODO: redirect to dashboard
    console.log(response);
  }
  return (
    <main>
      hello
      <form action={login}>
        <input name="email" type="email"></input>
        <input name="password" type="password"></input>
        <button className="size-2.5 bg-amber-500" type="submit"></button>
      </form>
    </main>
  );
}
