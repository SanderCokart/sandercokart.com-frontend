import "./globals.scss";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import Footer from "@/app/(components)/Footer";
import GlobalProviders from "@/app/(components)/GlobalProviders";
import ScrollProgressIndicator from "@/app/(components)/ScrollProgressIndicator";
import { Roboto } from "next/font/google";
import localFont from "next/font/local";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { cn } from "@/functions/shared/utils";

const fontLetsGoDigital = localFont({
  src: "../fonts/LetsGoDigital.ttf",
  variable: "--font-digital",
  weight: "400",
  style: "normal",
  preload: true,
});

const fontCascadiaMono = localFont({
  src: "../fonts/CascadiaMono.ttf",
  variable: "--font-cascadia-mono",
  weight: "400",
  style: "normal",
  preload: false,
});

const fontRoboto = Roboto({
  variable: "--font-roboto",
  weight: "400",
  subsets: ["latin"],
  style: "normal",
  preload: true,
});

const fontVariables = [
  fontLetsGoDigital.variable,
  fontCascadiaMono.variable,
  fontRoboto.variable,
];

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "sandercokart.com",
};

const ArrowNavButton = ({ children }: { children: ReactNode }) => (
  <button
    className={cn(
      "flex items-center gap-2 px-4 py-1",
      "font-digital text-xl md:text-2xl",
      "hover:bg-accent hover:text-accent-foreground",
      "bg-secondary transition-colors",
    )}
  >
    {children}
  </button>
);

const Header = () => (
  <header className="sticky top-0 flex h-16 justify-between bg-primary">
    <ArrowNavButton>
      <FaArrowLeft />
      Go Back
    </ArrowNavButton>
    <div className="container bg-red-500">test</div>
    <ArrowNavButton>
      Continue
      <FaArrowRight />
    </ArrowNavButton>
    <ScrollProgressIndicator />
  </header>
);

const RootLayout = (props: RootLayoutProps) => {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={cn(
          "font-sans",
          "bg-background text-foreground",
          fontVariables,
        )}
      >
        <GlobalProviders>
          <div className="flex min-h-dvh flex-col">
            <Header />
            <div className="grow">{props.children}</div>
          </div>
          {/*footer is always below the fold*/}
          <Footer />
        </GlobalProviders>
      </body>
    </html>
  );
};

export default RootLayout;
