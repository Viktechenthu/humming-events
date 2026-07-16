import type { Metadata } from "next";
import { Playfair_Display, Jost } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
});

export const metadata: Metadata = {
  title: "Humming Events — Wedding & Event Planners in Gwalior",
  description:
    "Humming Events is one of the best wedding and event planners in Gwalior, Madhya Pradesh. Weddings, birthdays, corporate and private events — planned to perfection. Call +91 88847 52613.",
  keywords: [
    "wedding planner Gwalior",
    "event management Gwalior",
    "Humming Events",
    "birthday party planner Gwalior",
    "corporate events Madhya Pradesh",
  ],
  openGraph: {
    title: "Humming Events — Wedding & Event Planners in Gwalior",
    description:
      "Weddings, birthdays, corporate and private events — planned to perfection in Gwalior, Madhya Pradesh.",
    type: "website",
    locale: "en_IN",
    images: ["/gallery/photo-2.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${jost.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
