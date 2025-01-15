import { seoAltTagPromptTemplate } from "@/config/prompts";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

import OpenAI from "openai";
const openai = new OpenAI();

const schemaAltTag = z.object({
  alt_tag: z.string(),
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

  return content;
};
