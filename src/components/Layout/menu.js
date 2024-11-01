import {
  BookOpen,
  Brain,
  Carrot,
  FileText,
  HelpCircle,
  Image,
} from "lucide-react";

export const menu = [
  {
    title: "Update Alt Tags with AI",
    icon: (
      // icon for a page
      <Brain alt="Brain icon" />
    ),
    href: "/dashboard/alt-tagger",
  },
  {
    title: "Update Images in Pages",
    icon: <BookOpen alt="Book icon" />,
    href: "/dashboard/pages",
  },
  {
    title: "URL to WebP",
    icon: <Image alt="Image icon" />,
    href: "/dashboard/get-images-by-url",
  },
  {
    title: "WebPage to PDF",
    href: "/dashboard/pdf-creator",
    icon: <FileText alt="File icon" />,
  },
  {
    title: "Href Extractor ",
    href: "/dashboard/url-analyzer",
    icon: <Carrot alt="Carrot icon" />,
  },
];

export const configMenu = [
  {
    title: "Wordpress Configuration",
    icon: (
      // icon for General Configuration
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="w-5 h-5 text-inherit"
      >
        <path
          fillRule="evenodd"
          d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244a.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
          clipRule="evenodd"
        ></path>
      </svg>
    ),
    href: "/dashboard/wp-configuration",
  },
];

export const helpMenu = [
  {
    title: "Help Center",
    icon: <HelpCircle alt="Help icon" />,
    href: "/dashboard/help",
  },
];
