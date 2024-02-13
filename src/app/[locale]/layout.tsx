import type { Metadata } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { Inter } from "next/font/google";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import "../globals.css";
import Navbar from "../components/navbar";

const inter = Inter({ subsets: ["latin"] });

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kevin Agyeman",
  image:
    "https://firebasestorage.googleapis.com/v0/b/kevinagyeman-db.appspot.com/o/cover-site.png?alt=media&token=be8cef1a-0754-42ed-83c6-479c19cbefee",
  description: "Web Developer",
};

type Props = {
  params: { id: string; locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `My Dealership | audi a 5`,
    description: `bla bla bla`,
    keywords: [`audi`, "bmw"],
    alternates: {
      canonical: "https://kevinagyeman.com",
    },
    openGraph: {
      title: `My Dealer Ship | audi a 5`,
      description: `bla bla bla`,
      url: "https://kevinagyeman.com",
      siteName: "My Dealership",
      images: [
        {
          url: `https://firebasestorage.googleapis.com/v0/b/kevinagyeman-db.appspot.com/o/cover-site.png?alt=media&token=be8cef1a-0754-42ed-83c6-479c19cbefee`,
          width: 800,
          height: 600,
        },
        {
          url: `https://firebasestorage.googleapis.com/v0/b/kevinagyeman-db.appspot.com/o/cover-site.png?alt=media&token=be8cef1a-0754-42ed-83c6-479c19cbefee`,
          width: 1800,
          height: 1600,
        },
      ],
      locale: params.locale,
      type: "website",
    },
  };
}

export default function RootLayout({ children, params: { locale } }: any) {
  const messages = useMessages();

  return (
    <html lang={locale} suppressHydrationWarning={true} data-theme="corporate">
      <body className={inter.className}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Theme accentColor="lime" radius="full">
          <NextIntlClientProvider messages={messages}>
            <Navbar />
            {children}
            {/* <Footer /> */}
          </NextIntlClientProvider>
        </Theme>
      </body>
    </html>
  );
}
