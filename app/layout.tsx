import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Taste Theory | Premium Recipe Hub",
  description: "Modern, dynamic platform to discover, learn, and cook delicious recipes like a pro.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} antialiased`}>
      <body className="min-h-screen bg-stone-50 text-stone-900 flex flex-col pt-20 selection:bg-orange-500/20">
        {/* Ambient background glow */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-orange-100/60 blur-[100px] rounded-full pointer-events-none -z-10" />

        <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-xl border-b border-stone-200/60 transition-all duration-300 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-tr from-orange-400 to-rose-400 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-orange-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                🍳
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-stone-900 group-hover:text-orange-600 transition-colors duration-300">
                Taste Theory
              </span>
            </Link>
            <div className="flex gap-8 items-center">
              <Link href="/" className="text-sm font-semibold text-stone-600 hover:text-orange-600 transition-colors">
                Explore
              </Link>
              <Link href="/categories" className="text-sm font-semibold text-stone-600 hover:text-orange-600 transition-colors">
                Categories
              </Link>
              <Link href="/chefs" className="text-sm font-semibold text-stone-600 hover:text-orange-600 transition-colors">
                Chefs
              </Link>
            </div>
          </div>
        </nav>
        <main className="flex-1 w-full flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
