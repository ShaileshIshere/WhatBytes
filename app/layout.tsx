import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// import { ThemeProvider } from "@/components/ThemeProvider"
import CartProvider from "@/components/providers/CartProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Whatbytes - Online Shopping",
    description: "Shop the latest products at Whatbytes",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="light">
            <body className={inter.className}>
                {/* <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} forcedTheme="light"> */}
                <CartProvider>
                    <div className="flex flex-col min-h-screen">
                        <Header />
                        <main className="flex-1">{children}</main>
                        <Footer />
                    </div>
                </CartProvider>
                {/* </ThemeProvider> */}
            </body>
        </html>
    );
}
