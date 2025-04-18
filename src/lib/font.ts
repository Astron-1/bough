import { EB_Garamond, Source_Sans_3 } from "next/font/google";

export const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
