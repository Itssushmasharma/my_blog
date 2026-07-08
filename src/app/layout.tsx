import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import ClientWrapper from "@/components/ui/client-wrapper";
import Navbar from "@/components/ui/navbar";
import { getFAQSchema, getOrganizationSchema, getPersonSchema, getWebsiteSchema, siteConfig } from "@/utils/seo";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: [
    "Sushma Sharma",
    "Python Developer",
    "UI UX Designer",
    "AI & ML",
    "Next.js Portfolio",
    "Technical Blog",
    "Bharti Airtel Intern",
    "Uttar Pradesh Developer",
    "Web Developer",
  ],
  authors: [{ name: "Sushma Sharma" }],
  creator: "Sushma Sharma",
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/sushma_profile.png",
        width: 800,
        height: 800,
        alt: "Sushma Sharma Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/sushma_profile.png"],
    creator: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Combine all schemas into a single array to inject
  const schemas = [
    getPersonSchema(),
    getOrganizationSchema(),
    getWebsiteSchema(),
    getFAQSchema()
  ];

  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased scroll-smooth`}>
      <head>
        {/* Inject JSON-LD Schema structures for Search Crawlers */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
        />
      </head>
      <body className="min-h-full bg-background-dark text-white flex flex-col selection:bg-primary-cyan/30 selection:text-white">
        <ClientWrapper>
          <Navbar />
          <main className="flex-grow">{children}</main>
        </ClientWrapper>
      </body>
    </html>
  );
}
