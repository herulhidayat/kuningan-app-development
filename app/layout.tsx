import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import Header from "@/components/organisms/header";
import Footer from "@/components/organisms/footer";
import { Providers } from "@/components/atoms/provider";
import "react-loading-skeleton/dist/skeleton.css";
import "leaflet/dist/leaflet.css";

const jost = Jost({
  variable: "--jost",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bidak | Big Data Kuningan",
  description: "Kab. Kuningan Website",
  icons: {
    icon: "/logo.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jost.variable} antialiased`}>
        <Providers>
          <Header />
          <div className="flex flex-col min-h-screen">
            <div className="flex flex-grow flex-col pt-14">{children}</div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
