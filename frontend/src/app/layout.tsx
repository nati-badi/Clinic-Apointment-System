import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Clinic Mini System",
  description: "A simple clinic appointment management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <Navbar />
          <main className="flex-grow p-6">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
