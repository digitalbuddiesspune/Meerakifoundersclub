import crypto from "crypto";

const SCRYPT_PARAMS = { N: 16384, r: 8, p: 1 };
const KEY_LEN = 64;

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, KEY_LEN, SCRYPT_PARAMS).toString("hex");
  return `scrypt:${salt}:${hash}`;
}

export function verifyPassword(password, storedHash) {
  if (!password || !storedHash || !storedHash.startsWith("scrypt:")) {
    return false;
  }

  const [, salt, hash] = storedHash.split(":");
  if (!salt || !hash) {
    return false;
  }

  const derived = crypto.scryptSync(password, salt, KEY_LEN, SCRYPT_PARAMS).toString("hex");

  try {
    return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(derived, "hex"));
  } catch {
    return false;
  }
}

export function isValidPassword(password) {
  return typeof password === "string" && password.length >= 6;
}
