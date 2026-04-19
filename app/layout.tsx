import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "Shop.com",
  description: "My App Description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <main className="min-h-screen flex-col justify-between">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
