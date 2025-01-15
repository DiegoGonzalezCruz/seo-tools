export const seoAltTagPromptTemplate = `
Generate an ALT tag and a Title for this image. 
- The ALT tag should be a clear, concise sentence without quotes or special characters, optimized for SEO.
- The Title should expand the current title creatively, making it more descriptive and engaging.
Respond in this JSON format:
{
  "alt_tag": "<generated alt tag>",
  "title": "<generated title>"
}
`;
