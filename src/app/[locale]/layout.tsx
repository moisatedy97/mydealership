import type { Metadata } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { Inter } from "next/font/google";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import "../globals.css";
import Navbar from "../components/navbar";
import SessionProvider from "../components/session-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Dealership",
  description: "My Dealership | Place to find your car",
};

export default function RootLayout({ children, params: { locale } }: any) {
  const messages = useMessages();

  return (
    <html lang={locale} suppressHydrationWarning={true} data-theme="corporate">
      <body className={inter.className}>
        <Theme accentColor="lime" radius="full">
          <NextIntlClientProvider messages={messages}>
            <Navbar />
            <div className="mx-auto my-10 max-w-5xl px-5">{children}</div>
            {/* <Footer /> */}
          </NextIntlClientProvider>
        </Theme>
        <SessionProvider />
      </body>
    </html>
  );
}
