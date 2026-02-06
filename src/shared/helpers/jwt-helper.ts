import { TOKEN_EXPIRATION } from "../constants/auth.constants";

interface TokenPayload {
  sub: string;
  iat: number;
  exp: number;
  username: string;
}

export const generateFakeJWT = (username: string): string => {
  const now = Date.now();
  const payload: TokenPayload = {
    sub: username,
    iat: now,
    exp: now + TOKEN_EXPIRATION.ACCESS_TOKEN,
    username,
  };

  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const encodedPayload = btoa(JSON.stringify(payload));
  const fakeSignature = btoa(`fake_signature_${username}_${now}`);

  return `${header}.${encodedPayload}.${fakeSignature}`;
};

export const decodeToken = (token: string): TokenPayload | null => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const payload = JSON.parse(atob(parts[1]));
    return payload as TokenPayload;
  } catch {
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  const payload = decodeToken(token);
  if (!payload) return true;

  const now = Date.now();
  return now >= payload.exp;
};

export const isTokenValid = (token: string): boolean => {
  if (!token) return false;

  const payload = decodeToken(token);
  if (!payload) return false;

  return !isTokenExpired(token);
};

export const getUsernameFromToken = (token: string): string | null => {
  const payload = decodeToken(token);
  return payload?.username || null;
};

export const getTokenTimeRemaining = (token: string): number => {
  const payload = decodeToken(token);
  if (!payload) return 0;

  const now = Date.now();
  const remaining = payload.exp - now;

  return remaining > 0 ? remaining : 0;
};

export const formatTokenTimeRemaining = (token: string): string => {
  const ms = getTokenTimeRemaining(token);
  if (ms === 0) return "Expirado";

  const minutes = Math.floor(ms / 60000);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours} hora${hours > 1 ? "s" : ""}`;
  }
  return `${minutes} minuto${minutes !== 1 ? "s" : ""}`;
};
