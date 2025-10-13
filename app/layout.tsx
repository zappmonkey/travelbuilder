import type { Metadata } from "next";
import { Geist, Geist_Mono, Ubuntu, Ubuntu_Mono } from "next/font/google";
import "./globals.css";

const ubuntuSans = Ubuntu({
  variable: "--font-ubuntu-sans",
  subsets: ["latin"],
    weight: ["300", "400", "500", "700"]
});

const ubuntuMono = Ubuntu_Mono({
  variable: "--font-ubuntu-mono",
  subsets: ["latin"],
   weight: ["400", "700"]
});

export const metadata: Metadata = {
  title: "NRV",
  description: "NRV - Nederland reist voordelig",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ubuntuSans.variable} ${ubuntuMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
