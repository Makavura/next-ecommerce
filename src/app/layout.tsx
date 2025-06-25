import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { CartProvider } from "@/context/CartContext";
import ReactQueryProvider from "@/utils/ReactQueryProvider";

import "./globals.css";
import RootNavBar from "../components/RootNavBar";
import {FavoriteProductsProvider} from "@/context/FavouriteProductsContext";

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
        <ReactQueryProvider>
          <CartProvider>
            <FavoriteProductsProvider>
              <RootNavBar />
              {children}
            </FavoriteProductsProvider>
          </CartProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
