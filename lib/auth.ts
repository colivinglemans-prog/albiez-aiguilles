import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

/**
 * Authentification du dashboard, reprise telle quelle de Barbusse : un mot de passe unique
 * en variable d'environnement, un JWT signé HS256 posé en cookie httpOnly. Pas de base de
 * données — le dashboard n'a qu'un seul utilisateur.
 */
const COOKIE_NAME = "dashboard_token";

/**
 * Deux rôles, deux usages qui n'ont rien à voir.
 *
 * `admin` voit tout. `menage` n'a accès qu'au calendrier, **sans aucun montant** : la
 * personne qui fait le ménage a besoin de savoir quand la maison se libère et quand elle se
 * remplit, pas de ce que rapporte un séjour.
 */
export type Role = "admin" | "menage";

function getSecret() {
  const secret = process.env.DASHBOARD_SECRET;
  if (!secret) throw new Error("DASHBOARD_SECRET n'est pas défini");
  return new TextEncoder().encode(secret);
}

export async function createToken(role: Role = "admin"): Promise<string> {
  return new SignJWT({ role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("90d")
    .sign(getSecret());
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}

/**
 * Rôle porté par le jeton. Un jeton illisible retombe sur `menage` et non sur `admin` :
 * en cas de doute, le moins de droits possible.
 */
export async function roleDuToken(token: string): Promise<Role> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload.role === "admin" ? "admin" : "menage";
  } catch {
    return "menage";
  }
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 90,
    path: "/",
  });
}

export async function removeAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export { COOKIE_NAME };
