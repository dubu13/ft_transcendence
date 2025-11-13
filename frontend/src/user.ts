export async function getUser(id: number|string, gateway = "http://localhost:3000") {
  const r = await fetch(`${gateway}/api/users/${id}`);
  return r.json();
}

export async function updateMe(token: string, data: { display_name?: string, bio?: string }, gateway = "http://localhost:3000") {
  const r = await fetch(`${gateway}/api/users/me`, {
    method: "PUT",
    headers: { "Content-Type":"application/json", Authorization: "Bearer " + token },
    body: JSON.stringify(data)
  });
  return r.json();
}
