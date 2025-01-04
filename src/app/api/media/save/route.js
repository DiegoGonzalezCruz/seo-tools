import fs from "fs";
import path from "path";

export const POST = async (req) => {
  // const { imageObject, userData } = await req.json()
  const { webpBase64, filename, pageSlug } = await req.json();

  const directory = path.join(process.cwd(), "public", "images", pageSlug);
  // Ensure directory exists or create it
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
  const filePath = path.join(directory, filename);
  const base64Data = webpBase64.replace(/^data:image\/\w+;base64,/, "");
  const dataBuffer = Buffer.from(base64Data, "base64");
  try {
    fs.writeFileSync(filePath, dataBuffer);
    return Response.json({ message: "File uploaded successfully", filePath });
  } catch (error) {
    console.error("Error converting and uploading image:", error);
    return Response.json({ error: error.message });
  }
};
