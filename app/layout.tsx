import { ThemeProvider } from "./providers";

import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-gradient">
        <div className="fixed inset-0 -z-10 h-full w-full bg-[url('/noise3.png')] opacity-[0.4] pointer-events-none bg-repeat" />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow container mx-auto py-8 mb-16 md:mb-0">
              {/* <main className="flex-grow container mx-auto py-8 mb-16 md:mb-0"> */}
              {children}
            </main>
            <footer className="bg-glass-effect text-primary-foreground py-2">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-center"></div>
                <div className="my-2 text-center text-sm">
                  © 2025 Mohan&apos;s Planet. All rights reserved.
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
