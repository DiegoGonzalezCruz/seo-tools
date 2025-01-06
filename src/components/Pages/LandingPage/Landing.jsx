import HeaderMenu from "./HeaderMenu";
import Contact from "./Contact";
import Hero from "./Hero";
import Features from "./Features";
import HelpCenter from "./HelpCenter";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen w-full  ">
      <div className=" flex flex-col items-center justify-center">
        {/* <HeaderMenu /> */}
        <main className="w-full">
          <Hero />
          <Features />
          {/* <Contact /> */}
          {/* <HelpCenter /> */}
        </main>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <p className="text-xs text-gray-500">
            © 2024 SEOAutomator. All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link
              href="/support/terms-of-service"
              className="text-xs hover:underline underline-offset-4"
            >
              Terms of Service
            </Link>
            <Link
              href="/support/privacy"
              className="text-xs hover:underline underline-offset-4 "
            >
              Privacy
            </Link>
          </nav>
        </footer>
      </div>
    </div>
  );
}
