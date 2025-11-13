export async function register(email: string, password: string, display: string, gateway = "http://localhost") {
  const r = await fetch(`${gateway}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, display_name: display }),
  });
  return r.json();
}

export async function login(email: string, password: string, twofa?: string, gateway = "http://localhost") {
  const r = await fetch(`${gateway}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, twofa_code: twofa }),
  });
  return r.json();
}
