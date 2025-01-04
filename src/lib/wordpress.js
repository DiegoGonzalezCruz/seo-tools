import * as cheerio from "cheerio";

export const getActiveWordPressInstance = (userData) => {
  const activeInstance = userData.wordpressInstances.find(
    (instance) => instance.isActive
  );
  if (!activeInstance) {
    throw new Error("No active WordPress instance found");
  }
  const { url, appPassword, appUsername } = activeInstance;
  const base64Credentials = btoa(`${appUsername}:${appPassword}`);
  return { url, appPassword, appUsername, base64Credentials };
};

export const getUserWPInstances = async (userId) => {
  // console.log("calling function");
  try {
    const res = await fetch(`/api/wordpressInstances?userId=${userId}`);
    const data = await res.json();
    // console.log(data, "🍄🍄🍄🍄🍄🍄🍄");
    if (data.status !== 200) {
      return null;
    }
    return data.wordpressInstances;
  } catch (e) {
    console.error("Failed to fetch WordPress instances:", e);
    return null;
  }
};
//
export const getMediaByPage = async (page = 1, limit = 50, userData) => {
  try {
    const { url, base64Credentials } = getActiveWordPressInstance(userData);
    const response = await fetch(
      `${url}/wp-json/wp/v2/media?per_page=${limit}&page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${base64Credentials}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const total = response.headers.get("X-WP-Total");
    const totalPages = response.headers.get("X-WP-TotalPages");
    const data = await response.json();

    const images = data.filter(
      (item) =>
        item.media_type === "image" &&
        (item.mime_type.includes("jpeg") ||
          item.mime_type.includes("png") ||
          item.mime_type.includes("gif") ||
          item.mime_type.includes("bmp") ||
          item.mime_type.includes("webp"))
    );

    return { images, total, totalPages };
  } catch (e) {
    console.error("Failed to fetch media:", e);
    return [];
  }
};

export const getWPInstance = async (userData) => {
  // console.log(userData, "🍄🍄🍄🍄🍄🍄🍄");
  try {
    const { url, appPassword, userId } = getActiveWordPressInstance(userData);
    return { url, appPassword, userId };
  } catch (e) {
    console.error("Failed to get WordPress instance:", e);
    return null;
  }
};

export const getPages = async (currentPage, perPage, userData) => {
  try {
    const { url, base64Credentials } = getActiveWordPressInstance(userData);
    const res = await fetch(
      `${url}/wp-json/wp/v2/pages?page=${currentPage}&per_page=${perPage}&_embed=true`,
      {
        headers: {
          Authorization: `Basic ${base64Credentials}`,
        },
      }
    );

    const total = res.headers.get("X-WP-Total");
    const totalPages = res.headers.get("X-WP-TotalPages");
    const data = await res.json();

    return { data, total, totalPages };
  } catch (e) {
    console.error("Failed to fetch pages:", e);
    return null;
  }
};

export const searchInPagesWithSlug = async (slug, userData) => {
  try {
    const { url, base64Credentials } = getActiveWordPressInstance(userData);
    const res = await fetch(
      `${url}/wp-json/wp/v2/pages?search=${slug}&_embed=true`,
      {
        headers: {
          Authorization: `Basic ${base64Credentials}`,
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (e) {
    console.error("Failed to search in pages:", e);
    return null;
  }
};

export const getPageMediaBySlug = async (slug, userData) => {
  try {
    const { url, base64Credentials } = getActiveWordPressInstance(userData);
    const pageRes = await fetch(
      `${url}/wp-json/wp/v2/pages?slug=${slug}&_embed=true`,
      {
        headers: {
          Authorization: `Basic ${base64Credentials}`,
        },
      }
    );

    const pageData = await pageRes.json();
    if (pageData.length > 0) {
      const page = pageData[0];
      let mediaFiles = [];

      // Fetch page HTML content directly
      const pageUrl = page.link; // Assuming 'link' contains the full URL of the page
      const pageHtmlRes = await fetch(pageUrl);
      const pageHtml = await pageHtmlRes.text();

      // Parse HTML using Cheerio to extract <img> tags
      const $ = cheerio.load(pageHtml);
      $("img").each((index, element) => {
        const src = $(element).attr("src");
        if (src) {
          mediaFiles.push({
            source_url: src,
            alt_text: $(element).attr("alt") || "", // Handle missing alt attribute
            mime_type: "image/jpeg", // Adjust mime type based on actual content
            // Include other relevant fields if needed
          });
        }
      });

      // Merge with media files fetched from _links['wp:attachment']
      if (page._links && page._links["wp:attachment"]) {
        const attachmentHref = page._links["wp:attachment"][0].href;
        const mediaRes = await fetch(attachmentHref, {
          headers: {
            Authorization: `Basic ${base64Credentials}`,
          },
        });
        const mediaData = await mediaRes.json();
        mediaFiles = mediaFiles.concat(mediaData);
      }

      page.mediaFiles = mediaFiles;
      return page;
    }

    return pageData;
  } catch (e) {
    console.error("Failed to fetch page media by slug:", e);
    return null;
  }
};

export const convertImage = async (imageObject, userData) => {
  try {
    const res = await fetch("/api/media/convert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageObject, userData }),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    console.error("Failed to convert and upload image:", e);
    return null;
  }
};
export const uploadImage = async (webpBase64, filename, userData) => {
  try {
    const res = await fetch("/api/media/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ webpBase64, filename, userData }),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    console.error("Failed to convert and upload image:", e);
    return null;
  }
};

export const getMediaById = async (id, userData) => {
  console.log(id, userData, "🍄🍄🍄🍄🍄🍄🍄");
  try {
    const { url, base64Credentials } = getActiveWordPressInstance(userData);
    const response = await fetch(`${url}/wp-json/wp/v2/media/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${base64Credentials}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (e) {
    console.error("Failed to fetch media:", e);
    return null;
  }
};

export const backupOldImage = async (oldImageUrl, userData) => {
  try {
    // Fetch the old image
    const response = await fetch(oldImageUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch the old image.");
    }
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");
    const contentType = response.headers.get("content-type");
    const extension = contentType.split("/").pop();
    const filename = `backup-${oldImageUrl.split("/").pop().split(".")[0]}.${extension}`;

    // Upload the backup image using the existing uploadImage function
    const backupImage = await uploadImage(base64, filename, userData);
    return backupImage;
  } catch (e) {
    console.error("Failed to backup old image:", e);
    return null;
  }
};

export const replaceImageInWordPress = async (mediaId, webpImage, userData) => {
  // console.log(mediaId, '🍄🍄🍄🍄🍄🍄🍄 media ID')
  // console.log(webpImage, '🍄🍄🍄🍄🍄🍄🍄 webp image')
  // console.log(userData, '🍄🍄🍄🍄🍄🍄🍄 user data')
  // console.log(webpImage.source_url, '🍄🍄🍄🍄🍄🍄🍄 webp image source url')
  // console.log(
  //   webpImage.media_details,
  //   '🍄🍄🍄🍄🍄🍄🍄 webp image media details',
  // )
  try {
    const { url, base64Credentials } = getActiveWordPressInstance(userData);
    console.log(url, base64Credentials, "🍄🍄🍄🍄🍄🍄🍄");

    const response = await fetch(
      `${url}/wp-json/custom/v1/update-media/${mediaId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${base64Credentials}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source_url: webpImage.source_url,
          media_details: webpImage.media_details,
        }),
      }
    );
    // console.log(response, 'response 🇨🇱🇨🇱🇨🇱🇨🇱🇨🇱🇨🇱🇨🇱🇨🇱')
    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} - ${await response.text()}`
      );
    }
    const data = await response.json();
    console.log(data, "data 🇨🇱🇨🇱🇨🇱🇨🇱🇨🇱🇨🇱🇨🇱🇨🇱");
    return data;
  } catch (e) {
    console.error("Failed to replace image:", e);
    return null;
  }
};

export const saveImage = async (webpBase64, filename, pageSlug) => {
  console.log(webpBase64, filename, pageSlug, "🍄🍄🍄🍄FROM saveImage 🍄🍄🍄");
  try {
    const res = await fetch("/api/media/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ webpBase64, filename, pageSlug }),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    console.error("Failed to convert and upload image:", e);
    return null;
  }
};

export const validateWordPressCredentials = async (
  url,
  appUsername,
  appPassword
) => {
  try {
    const base64Credentials = btoa(`${appUsername}:${appPassword}`);
    console.log(base64Credentials, "🍄🍄🍄🍄🍄🍄🍄 base64Credentials");
    const response = await fetch(`${url}/wp-json/wp/v2/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${base64Credentials}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response, "🍄🍄🍄🍄🍄🍄🍄 response");

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // console.error("Failed to validate credentials:", error);
    return null;
  }
};

export const getCPTs = async (userData) => {
  try {
    const { url, base64Credentials } = getActiveWordPressInstance(userData);

    const res = await fetch(`${url}/wp-json/wp/v2/types`, {
      headers: {
        Authorization: `Basic ${base64Credentials}`,
      },
    });
    console.log(res, "🍄🍄🍄🍄🍄🍄🍄 res");
    // const total = res.headers.get('X-WP-Total')
    // const totalPages = res.headers.get('X-WP-TotalPages')
    const data = await res.json();
    const returnedData = {
      data,
      // total, totalPages
    };
    console.log(returnedData, "🍄🍄🍄🍄🍄🍄🍄 returned");
    return returnedData;
  } catch (e) {
    console.error("Failed to fetch CPTs:", e);
    return null;
  }
};
