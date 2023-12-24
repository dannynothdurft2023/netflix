1. Lege ein modules Order an fals noch keiner da ist und lege den app-loader Ordner hinein.
2. Installiere das Paket "npm install --save react-spinners"
3. Eine Documentation gibt es hier "https://www.davidhu.io/react-spinners/"
4. Importiere den Loader in App Start Datei (layout.tsx)

```
import AppLoader from "@/modules/app-loader/AppLoader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <AppLoader />
        {children}
      </body>
    </html>
  );
}

```
