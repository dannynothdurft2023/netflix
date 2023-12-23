import type { Metadata } from "next";
import "@/styles/globals.scss";

import AuthProvider from "@/provider/AuthProvider";

export const metadata: Metadata = {
  title: "Netflix Clone",
  description: "Privates Netflix Clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <AuthProvider>
        <body>{children}</body>
      </AuthProvider>
    </html>
  );
}
