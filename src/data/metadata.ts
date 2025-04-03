import { Metadata } from "next";

export const siteBasics = {
  name: "Brushbox",
    description: `Experience the best of Nairobi's beauty scene at Brushbox salon. 
    Our talented team of stylists and therapists are dedicated to providing 
    you with exceptional service and unparalleled pampering. From cuts and colours to 
    massages and makeup, we've got you covered. Book your appointment today!`,
    briefDescription: `Book your appointment today at Brushbox salon, 
    Nairobi's premier destination for beauty and wellness.`,
  url: "https://brushbox.vercel.app",
};
export const author = {
  name: "Tigawanna",
  url: "https://github.com/Tigawanna",
};

export const metadata: Metadata = {
  title: {
    default: siteBasics.name,
    template: "%s | Brushbox",
  },
  authors: [
    {
      name: author.name,
      url: author.url,
    },
  ],
  description: siteBasics.description,
  keywords: [
    "salon",
    "beauty",
    "hair",
    "makeup",
    "twists",
    "braids",
    "nairobi",
    "kenya",
    "hair salon",
  ],
  creator: author.name,
  publisher: author.name,
  formatDetection: {
    telephone: true,
    date: false,
    address: true,
    email: true,
  },
  metadataBase: new URL(siteBasics.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteBasics.name}  | Salon in Nairobi`,
    description:siteBasics.description,
    url: siteBasics.url,
    siteName: siteBasics.name,
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteBasics.name} | Salon in Nairobi`,
    description:siteBasics.briefDescription
  },
};
