import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ProvidersWrapper from "./contexts/ProvidersWrapper";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BM Bot",
  description: "AI chatbot and content summarization tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ProvidersWrapper>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 w-full">
              {children}
            </main>
            <footer className="py-4 px-4 mt-auto text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
              <div className="container mx-auto">
                <p>© {new Date().getFullYear()} BareMinimum Bot</p>
              </div>
            </footer>
          </div>
        </ProvidersWrapper>
      </body>
    </html>
  );
}
