import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SortingAlgorithmProvider } from "@/context/visualizer";
import Nav from "@/components/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Visualizer",
  description: "Noah Rodriguez | TypeScript Practice",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SortingAlgorithmProvider>
      <html lang="en">
        <body className={inter.className}>
          <Nav />
          <main>{children}</main>
        </body>
      </html>
    </SortingAlgorithmProvider>
  );
}
