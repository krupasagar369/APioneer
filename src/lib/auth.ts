import { cookies } from "next/headers";

const SECRET = process.env.SESSION_SECRET || "apioneer-dev-secret-change-me";
const COOKIE_NAME = "apioneer_admin_session";

async function hmacSha256Hex(secret: string, value: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sigBuffer = await crypto.subtle.sign("HMAC", key, enc.encode(value));
  return Array.from(new Uint8Array(sigBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function sign(value: string): Promise<string> {
  const hmac = await hmacSha256Hex(SECRET, value);
  return `${value}.${hmac}`;
}

async function verify(signed: string): Promise<string | null> {
  const idx = signed.lastIndexOf(".");
  if (idx === -1) return null;
  const value = signed.slice(0, idx);
  const sig = signed.slice(idx + 1);
  const expected = await hmacSha256Hex(SECRET, value);
  if (sig !== expected) return null;
  return value;
}

export async function createSession(userId: string, email: string) {
  const payload = JSON.stringify({ userId, email, exp: Date.now() + 1000 * 60 * 60 * 24 * 7 });
  const value = Buffer.from(payload, "utf-8").toString("base64");
  const token = await sign(value);
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getSession(): Promise<{ userId: string; email: string } | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;
  const raw = await verify(token);
  if (!raw) return null;
  try {
    const payload = JSON.parse(Buffer.from(raw, "base64").toString("utf-8"));
    if (payload.exp < Date.now()) return null;
    return { userId: payload.userId, email: payload.email };
  } catch {
    return null;
  }
}

export async function destroySession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export const SESSION_COOKIE_NAME = COOKIE_NAME;