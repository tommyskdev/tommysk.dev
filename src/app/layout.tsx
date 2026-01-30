import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Tommy SK - Full Stack Developer",
  description: "Portfolio of Tommy SK - Full Stack Developer specializing in modern web technologies, building beautiful and functional web experiences.",
  keywords: ["portfolio", "developer", "full stack", "web development", "next.js", "react", "typescript"],
  authors: [{ name: "Tommy SK" }],
  openGraph: {
    title: "Tommy SK - Full Stack Developer",
    description: "Portfolio of Tommy SK - Full Stack Developer specializing in modern web technologies.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/fonts/fontawesome.min.css" />
      </head>
      <body>
        <div className="gradient gradient-1"></div>
        <div className="gradient gradient-2"></div>
        <div className="gradient gradient-3"></div>
        <div className="starfield starfield-small"></div>
        <div className="starfield starfield-medium"></div>
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
