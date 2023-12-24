import type { Metadata } from "next";
import "@/styles/globals.scss";

import { Redux } from "@/module/redux/Redux";

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
    <Redux>
      <html lang="de">
        <body>{children}</body>
      </html>
    </Redux>
  );
}
