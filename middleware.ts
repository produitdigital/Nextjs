import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["fr", "en"];
// Chemins à exclure complètement de la redirection de langue (pas de préfixe)
const excludedPaths = ["/login", "/admin", "/sitemap.xml", "/robots.txt"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Si le chemin commence par un chemin exclu → on laisse passer tel quel
  if (excludedPaths.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return NextResponse.next();
  }

  // Vérifie si la langue est déjà présente
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(new URL(`/fr${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|banner.webp|teamwork.webp|profil.webp).*)",
  ],
};
