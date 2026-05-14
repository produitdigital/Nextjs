import { ReactNode } from "react";

export const metadata = {
  title: "Contact | Assistant Virtuel en Comptabilité",
  description:
    "Contactez un assistant virtuel en comptabilité pour vos besoins en gestion financière.",
  robots: "index, follow",
  alternates: {
    canonical: "https://virtuel-comptable.web.app/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
