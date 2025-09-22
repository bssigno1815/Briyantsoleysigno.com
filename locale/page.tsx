import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = { title: "BSS 1815", description: "Briyant Solèy Signo 1815" };

export default function RootLayout({ children, params:{locale} }:{
  children: React.ReactNode; params:{locale:string}
}) {
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
