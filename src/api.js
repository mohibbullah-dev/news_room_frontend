const BASE = import.meta.env.VITE_API_URL;

export const api = async (
  path,
  { method = "GET", body, token, isForm = false } = {}
) => {
  const headers = {};
  if (!isForm) headers["Content-Type"] = "application/json";
  if (token) headers["Authorization"] = `Bearer ${token}`;

  console.log("[api]", method, path);

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: isForm ? body : body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error((await res.json()).message || "API error");
  return res.json();
};
