import { ebGaramond, sourceSans } from "@app/lib/font";
import "@app/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${ebGaramond.variable} ${sourceSans.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}
