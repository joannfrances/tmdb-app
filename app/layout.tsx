import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "../lib/hooks/context/auth-context";
import { WatchlistProvider } from "@/lib/hooks/context/watchlist-context";
import Header from "@/components/Header";

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

export const metadata: Metadata = {
  title: "TMDB App",
  description:
    "Discover movies, create watchlists, and keep track of your favorite films",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-full`}
      >
        <AuthProvider>
          <WatchlistProvider>
            <Header />
            <main>{children}</main>
          </WatchlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
