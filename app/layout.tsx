import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-provider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Memory Quest - Memory Matrix Game",
  description:
    "Challenge your memory with Memory Quest, an engaging memory matrix game that tests and improves your recall abilities.",
  keywords:
    "memory game, memory matrix, brain training, memory quest, puzzle game, cognitive skills, sudhanshu lohana",
  openGraph: {
    title: "Memory Quest",
    description:
      "Test your memory skills with our interactive memory matrix game",
    type: "website",
  },
  authors: [
    {
      name: "Sudhanshu Lohana",
      url: "https://portfolio-black-two-36.vercel.app/",
    },
  ],
  alternates: {
    canonical: "./",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <ThemeProvider>
        <body className={`${roboto.className} antialiased`}>{children}</body>
      </ThemeProvider>
    </html>
  );
}
