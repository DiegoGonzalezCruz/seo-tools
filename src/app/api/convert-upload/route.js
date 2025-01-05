import sharp from "sharp";
import FormData from "form-data";
import { getActiveWordPressInstance } from "@/lib/wordpress";

export const POST = async (req) => {
  const { imageObject, userData } = await req.json();

  const { url, base64Credentials } = getActiveWordPressInstance(userData);

  // console.log(url, 'url')
  // console.log(base64Credentials, 'base64Credentials')

  try {
    // Fetch the image
    const response = await fetch(imageObject.source_url);
    if (!response.ok) {
      throw new Error("Failed to fetch the image.");
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    // console.log(buffer, "buffer 🤩");
    const fullFilename = imageObject.source_url.split("/").pop();
    const ext = fullFilename.split(".").pop().toLowerCase();
    const filename = fullFilename.split(".").slice(0, -1).join(".");

    // console.log(ext, "ext 🤩");
    // console.log(filename, "filename 🤩");

    if (ext !== "jpg" && ext !== "jpeg" && ext !== "png") {
      return new Response(
        JSON.stringify({ error: "Not a supported image type" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Convert to WebP
    const webpBuffer = await sharp(buffer).webp().toBuffer();
    // console.log(webpBuffer, "webpBuffer");

    // Create form data using the form-data package
    const formData = new FormData();
    formData.append("file", webpBuffer, {
      filename: `${filename}.webp`,
      contentType: "image/webp",
    });

    // Upload the WebP image to WordPress
    const uploadResponse = await fetch(`${url}/wp-json/wp/v2/media`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${base64Credentials}`,
        ...formData.getHeaders(),
      },
      body: formData,
    });

    // console.log(uploadResponse, "uploadResponse");

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      console.error("Error response from upload:", errorText);
      throw new Error(`Failed to upload WebP image: ${errorText}`);
    }

    const uploadData = await uploadResponse.json();
    return new Response(JSON.stringify(uploadData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error converting and uploading image:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
