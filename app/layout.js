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
  title: "BareMinimum Bot",
  description: "AI chatbot and content summarization tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProvidersWrapper>
          <div className="flex flex-col h-full">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </ProvidersWrapper>
      </body>
    </html>
  );
}
