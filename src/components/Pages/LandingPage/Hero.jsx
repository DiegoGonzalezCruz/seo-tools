"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary ">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
              Automate Your SEO Tasks with Ease
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
              Streamline your web development workflow and boost your SEO
              performance with our powerful automation tools.
            </p>
          </div>
          <Link href={"/login"}>
            <Button
              className="bg-white text-primary hover:bg-gray-100"
              size="lg"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
