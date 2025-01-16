// import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
// imageUtils.js
import toast from "react-hot-toast";

export const updateAltTag = async (id, altTag, userData) => {
  if (!id || !altTag || !userData) {
    throw new Error("Invalid arguments for updateAltTag");
  }

  const res = await fetch("/api/updateAltTag", {
    method: "POST",
    body: JSON.stringify({ id, altTag, userData }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error updating alt tag");
  }

  const data = await res.json();
  return data;
};

export const identifyAndUpdateAltTag = async (media, userData) => {
  // console.log(media, "media");
  // console.log(userData, "userData");
  // console.log(media.slug, "media");
  const toastId = toast.loading(`Analyzing image: ${media.slug}`);
  try {
    const res = await fetch("/api/identifyImage", {
      method: "POST",
      body: JSON.stringify({ media, userData }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(res, "RES ****");

    const data = await res.json();
    console.log(data, "DATA ****");
    console.log(typeof data, "DATA TYPE"); // Should print "object"

    if (data.error) {
      // If the backend returns an error message, display it
      throw new Error(data.error);
    }

    await updateAltTag(media.id, data.alt_tag, userData);
    toast.dismiss(toastId);

    return data.altTag;
  } catch (error) {
    toast.dismiss(toastId);

    throw error;
  }
};

// export const createEmbedding = async () => {
//   console.log("creating embedding");
//   try {
//     const res = await fetch("/api/embeddings/", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json"
//       }
//     });
//     console.log(res, "res");
//     if (res.ok) {
//       // Using res.ok to check for HTTP status 200-299
//       const data = await res.json();
//       // console.log(data, "data");
//       return data;
//     } else {
//       console.error("Error creating embedding:", res.status);
//       throw new Error(`Failed to create embedding: ${res.status}`);
//     }
//   } catch (error) {
//     console.error("Network or other error:", error);
//     throw error;
//   }
// };

// export const createPrompt = async () => {
//   console.log("creating prompt");
//   const res = await fetch("/api/prompt/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({ question: "How to achieve financial success?" })
//   });
//   if (res.status === 200) {
//     const data = await res.json();
//     console.log(data, "data");
//     return data;
//   }
// };

// export const retrieveFromVectorStore = async () => {
//   console.log("retrieving from vector store");
//   try {
//     const res = await fetch("/api/retrieval/", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json"
//       }
//     });
//     if (res.status === 200) {
//       const data = await res.json();
//       console.log(data, "data");
//       return data;
//     } else {
//       console.error("Error creating embedding:", res.status);
//       throw new Error(`Failed to create embedding: ${res.status}`);
//     }
//   } catch (error) {
//     console.error("Network or other error:", error);
//     throw error;
//   }
// };

// // // Async function to fetch data from a local file
// export const splitDocuments = async (source) => {
//   console.log("split documents");
//   try {
//     const res = await fetch("/api/splitDocuments/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ source })
//     });
//     if (res.ok) {
//       const data = await res.json();
//       console.log(data, "data");
//       return data;
//     }
//   } catch (error) {
//     console.error("Network or other error:", error);
//     throw error;
//   }
// };

// export const runnableSequence = async () => {
//   console.log("running sequence");
//   try {
//     const res = await fetch("/api/runnableSequence/", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json"
//       }
//       // body: JSON.stringify({ source }),
//     });
//     if (res.ok) {
//       const data = await res.json();
//       console.log(data, "data");
//       return data;
//     }
//   } catch (error) {
//     console.error("Network or other error:", error);
//     throw error;
//   }
// };

// export const createStoryFromInput = async (input) => {
//   console.log("creating story from input");
//   try {
//     const res = await fetch("/api/createStory/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         input
//       })
//     });
//     if (res.ok) {
//       const data = await res.json();
//       console.log(data, "data");
//       return data;
//     }
//   } catch (error) {
//     console.error("Network or other error:", error);
//     throw error;
//   }
// };
