import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Binge Benchmark",
  description: "Don't waste your time on bad TV",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={rubik.variable}>
      <body className={`antialiased flow-root`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
