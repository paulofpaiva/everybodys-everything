import Providers from "./providers";
import { Toaster } from "sonner";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <title>everybody's everything</title>
        <meta name="description" content="Just share whatever" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:bg-black dark:from-black dark:to-black">
        <Providers>
          <div className="min-h-screen">
            {children}
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}