import { Inter } from "next/font/google";
import "./globals.css";
import ClientProvider from "./ClientProvider";
import Aside from "@/components/Layout/Aside";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Automatic Tagger",
  description: "Tags images automatically",
};

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <ClientProvider>
          <div className="flex flex-col min-h-screen  w-full  items-center justify-center">
            {children}
          </div>
        </ClientProvider>
      </body>
    </html>
  );
}
