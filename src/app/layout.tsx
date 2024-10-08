import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import Providers from "@/components/providers";
import { Toaster } from "sonner";


export const metadata: Metadata = {
  title: "Vivo",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
      <body
      >
        <Toaster richColors theme="light" />
        
          {children}
      </body>
    </html>
    </Providers>
  );
}
