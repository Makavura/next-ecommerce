import { Anonymous_Pro, Roboto_Mono } from "next/font/google";

const anonymousPro = Anonymous_Pro({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export {
    robotoMono,
    anonymousPro
}