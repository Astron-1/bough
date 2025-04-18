import GlobalClickSpark from "./GlobalClickSpark";
import { ebGaramond, sourceSans } from "@app/lib/font";

export default function RootLayout({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className: string;
}>) {
  return (
    <div
      className={`px-32 py-10 text-black text-3xl ${className}`}
      style={{ fontWeight: 500 }}
    >
      <GlobalClickSpark>{children}</GlobalClickSpark>
    </div>
  );
}
