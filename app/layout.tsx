import type { Metadata } from "next";
import "@/styles/globals.scss";

import AuthProvider from "@/provider/AuthProvider";
import { Redux } from "@/provider/Redux";

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
      <Redux>
        <AuthProvider>
          <body>{children}</body>
        </AuthProvider>
      </Redux>
    </html>
  );
}
