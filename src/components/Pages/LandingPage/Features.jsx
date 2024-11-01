"use client";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const Features = () => {
  return (
    <section
      id="features"
      className="w-full py-12 md:py-24 lg:py-32 bg-gray-100"
    >
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
          Powerful Features
        </h2>
        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>WordPress Configuration</CardTitle>
              <CardDescription>
                Connect SEO tools to WordPress seamlessly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Easily configure our SEO tools to work with your WordPress site
                using application passwords for secure and efficient
                integration.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>AI-powered Alt Tags</CardTitle>
              <CardDescription>
                Enhance accessibility and SEO with smart alt text
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Automatically update image alt tags using advanced AI, improving
                both accessibility and search engine optimization for your
                website.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Image Management</CardTitle>
              <CardDescription>
                Optimize and convert images effortlessly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  Fetch, convert, and re-upload page images to WebP format
                </li>
                <li>Convert any image URL to WebP on-the-fly</li>
                <li>Transform webpage URLs into downloadable PDFs</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="mt-12 text-center">
          <Link href="/login">
            <Button variant="outline" size="lg">
              Explore All Features
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Features;
