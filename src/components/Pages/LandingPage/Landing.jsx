import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Code,
  Image,
  FileType,
  Link,
  MessageSquare,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import HeaderMenu from "./HeaderMenu";
import Contact from "./Contact";
import Hero from "./Hero";
import Features from "./Features";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen w-full  ">
      <div className=" flex flex-col items-center justify-center">
        {/* <HeaderMenu /> */}
        <main className="w-full">
          <Hero />
          <Features />
          <Contact />
          <section
            id="help-center"
            className="w-full py-12 md:py-24 lg:py-32 bg-gray-100"
          >
            <div className="container px-4 md:px-6">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Help Center
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Maximize your app usage with our comprehensive guides,
                  tutorials, and FAQs.
                </p>
              </div>
              <div className="mt-12 grid gap-6 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Getting Started Guide</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Learn the basics of SEOAutomator and set up your first
                      automated SEO tasks.
                    </p>
                    <Button variant="link" className="mt-4">
                      Read Guide
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Video Tutorials</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Watch step-by-step video tutorials on how to use advanced
                      features and optimize your workflow.
                    </p>
                    <Button variant="link" className="mt-4">
                      Watch Videos
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>FAQs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Find answers to commonly asked questions about
                      SEOAutomator features and best practices.
                    </p>
                    <Button variant="link" className="mt-4">
                      View FAQs
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </main>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <p className="text-xs text-gray-500">
            © 2024 SEOAutomator. All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link
              href="#"
              className="text-xs hover:underline underline-offset-4"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-xs hover:underline underline-offset-4"
            >
              Privacy
            </Link>
          </nav>
        </footer>
      </div>
    </div>
  );
}
