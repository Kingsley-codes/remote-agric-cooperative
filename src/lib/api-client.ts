const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export function apiUrl(path: string) {
  return `${base}${path}`;
}

// Session cookies belong to the API host and are never read by JavaScript.
export function apiFetch(path: string, options: RequestInit = {}) {
  const timeout = AbortSignal.timeout(25000);
  return fetch(apiUrl(path), {
    ...options,
    signal: options.signal
      ? AbortSignal.any([options.signal, timeout])
      : timeout,
    credentials: "include",
    cache: "no-store",
  });
}

export async function authRequest(action: string, body: unknown) {
  let response: Response;
  try {
    response = await apiFetch(`/auth/${action}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error("Could not connect. Check your connection and try again.");
  }
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.message ?? "Unable to continue. Please try again.");
  return data;
}
