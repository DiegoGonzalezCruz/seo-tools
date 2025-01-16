"use server";

import { seoAltTagPromptTemplate } from "@/config/prompts";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

import OpenAI from "openai";
const openai = new OpenAI();

const schemaAltTag = z.object({
  alt_tag: z.string(),
});

const schemaTitle = z.object({
  title: z.string(),
});

export const analyzeImageWithOpenAI = async (mediaUrl) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: `${seoAltTagPromptTemplate}` },
          {
            type: "image_url",
            image_url: {
              url: mediaUrl,
            },
          },
        ],
      },
    ],
    response_format: zodResponseFormat(schemaAltTag, "alt_tag"),
  });
  const content = response.choices[0].message.content;
  console.log(content, "OUTPUT OPEN AI");
  console.log(typeof content);

  return content;
};

export const improveTitle = async (title) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `Improve the title "${title}" to make it more engaging, informative and SEO friendly.`,
      },
    ],
    response_format: zodResponseFormat(schemaTitle, "title"),
  });
  const improvedTitle = response.choices[0].message.content;
  console.log(improvedTitle, "OUTPUT IMPROVE TITLE");
  console.log(typeof improvedTitle);
  return improvedTitle;
};
