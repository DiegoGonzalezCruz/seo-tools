import {
  BookOpen,
  Brain,
  Carrot,
  Cog,
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
    title: "Configuration",
    icon: <Cog alt="Cog icon" />,
    href: "/dashboard/configuration",
  },
  // {
  //   title: "LLM Configuration",
  //   icon: <BookOpen alt="Book icon" />,
  //   href: "/dashboard/llm-configuration",
  // },
];

export const helpMenu = [
  {
    title: "Help Center",
    icon: <HelpCircle alt="Help icon" />,
    href: "/dashboard/help",
  },
];
