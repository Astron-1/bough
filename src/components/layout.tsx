import GlobalClickSpark from "./GlobalClickSpark";
// import { ebGaramond, sourceSans } from "@app/lib/font";

export default function RootLayout({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className: string;
}>) {
  return (
    <div
      className={` py-10 text-black ${className}`}
      style={{ fontWeight: 500 }}
    >
      <GlobalClickSpark>{children}</GlobalClickSpark>
    </div>
  );
}
