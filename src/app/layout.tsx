import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import RootNavBar from "./components/RootNavBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-Commerce StoreFront",
  description: "",
};

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-screen`}
      >
        <QueryClientProvider client={queryClient}>
          <RootNavBar />
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
