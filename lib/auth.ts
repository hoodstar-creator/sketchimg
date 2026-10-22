import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "caricature_admin";

function configuredPassword() {
  return process.env.ADMIN_PASSWORD ?? "";
}

function safeEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function isCorrectPassword(candidate: string) {
  const expected = configuredPassword();
  return expected.length >= 8 && safeEqual(candidate, expected);
}

export function sessionValue() {
  return createHash("sha256")
    .update(`caricature-admin:${configuredPassword()}`)
    .digest("base64url");
}

export async function isAdmin() {
  const value = (await cookies()).get(ADMIN_COOKIE)?.value ?? "";
  return value.length > 0 && safeEqual(value, sessionValue());
}
