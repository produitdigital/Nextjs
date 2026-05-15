import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Liste des langues supportées
const locales = ["fr", "en"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // On vérifie si l'URL contient déjà une langue supportée
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Si la langue manque, on redirige vers le français (/fr) par défaut
  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(
      new URL(`/fr${pathname}`, request.url)
    );
  }
}

export const config = {
  // CRITIQUE : Cette liste empêche le middleware de bloquer tes images et fichiers techniques
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|banner.webp|teamwork.webp|profil.webp).*)",
  ],
};
