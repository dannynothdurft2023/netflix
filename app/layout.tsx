import type { Metadata } from "next";
import "@/styles/globals.scss";

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
      <body>{children}</body>
    </html>
  );
}
