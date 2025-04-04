import { metadata as importedMeta } from "@/data/metadata";
import "./globals.css";
// import "@/view-transition/angled-transition.css";
// import "@/view-transition/wipe-transition.css";
// import "@/view-transition/slides-transition.css";
// import "@/view-transition/flip-transition.css";
// import "@/view-transition/vertical-transition.css";

import { Inter, Playfair_Display } from "next/font/google";
import { FooterSection } from "@/components/nav/FooterSection";
import { TigawannaFooter } from "@/components/nav/TigawannaFooter";


const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = importedMeta;

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-style="vertical" data-theme="halloween">
      <body className={`${playfair.variable} ${inter.variable}  antialiased  font-serif`}>
        {children}
        <FooterSection />
        <TigawannaFooter />
      </body>
    </html>
  );
}
