import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { ThemeProvider } from "../components/ThemeProvider";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FinTech Dashboard",
  description: "A modern fintech dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white`}
      >
        <Providers>
          <ThemeProvider>
            <div className="flex h-screen">
              <Sidebar />
              <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
                  {children}
                </main>
              </div>
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
