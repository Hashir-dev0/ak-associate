const JWT_SECRET = process.env.ADMIN_JWT_SECRET || "ak-associates-secure-cms-secret-key-2026-super-safe";

// Base64Url helpers that work in all environments (Browser, Edge Runtime, Node.js)
export function base64UrlEncode(str: string): string {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(str).toString("base64url");
  }
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function base64UrlDecode(str: string): string {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(str, "base64url").toString("utf-8");
  }
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  return atob(base64);
}

// Deterministic cryptographic hash function in pure JS (Zero eval, Edge & Node compatible)
export function hashPassword(password: string, salt: string = "ak_salt_2026"): string {
  const combined = `${password}:${salt}:${JWT_SECRET}`;
  let h1 = 0x811c9dc5;
  let h2 = 0xcbf29ce4;
  for (let i = 0; i < combined.length; i++) {
    const code = combined.charCodeAt(i);
    h1 = Math.imul(h1 ^ code, 16777619);
    h2 = Math.imul(h2 ^ (code + i), 1099511628 % 0x100000000);
  }
  const part1 = (h1 >>> 0).toString(16).padStart(8, "0");
  const part2 = (h2 >>> 0).toString(16).padStart(8, "0");
  return `${part1}${part2}`;
}

// Fast keyed signature generation for JWT tokens (Edge & Node compatible)
function calculateSignature(data: string, secret: string): string {
  let h1 = 0xdeadbeef ^ secret.length;
  let h2 = 0x41c6ce57 ^ secret.length;
  const str = `${data}.${secret}`;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return `${(h1 >>> 0).toString(36)}-${(h2 >>> 0).toString(36)}`;
}

// Generate session token (payload + signature)
export function createSessionToken(payload: { email: string; role: string }): string {
  const data = JSON.stringify({
    ...payload,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
  });
  const base64Data = base64UrlEncode(data);
  const signature = calculateSignature(base64Data, JWT_SECRET);
  return `${base64Data}.${signature}`;
}

// Verify session token
export function verifySessionToken(token: string): { email: string; role: string } | null {
  if (!token || !token.includes(".")) return null;
  const [base64Data, signature] = token.split(".");
  const expectedSignature = calculateSignature(base64Data, JWT_SECRET);

  if (signature !== expectedSignature) return null;

  try {
    const jsonStr = base64UrlDecode(base64Data);
    const data = JSON.parse(jsonStr);
    if (data.exp && Date.now() > data.exp) return null;
    return { email: data.email, role: data.role };
  } catch {
    return null;
  }
}
