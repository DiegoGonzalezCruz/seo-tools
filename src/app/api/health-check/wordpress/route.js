import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const POST = async (req) => {
  console.log("POST /api/health-check/wordpress");

  const { userId } = await req.json();
  console.log("userId", userId);

  const wordpressInstance = await prisma.wordPressInstance.findFirst({
    where: {
      userId: userId,
      isActive: true,
    },
  });
  console.log("wordpressInstance", wordpressInstance);

  if (!wordpressInstance) {
    return new Response(false, { status: 404 });
  }

  const authHeader =
    "Basic " +
    Buffer.from(
      `${wordpressInstance.appUsername}:${wordpressInstance.appPassword}`
    ).toString("base64");
  const authUrl = `${wordpressInstance.url}/wp-json/wp/v2/users/me`;

  try {
    const response = await fetch(authUrl, {
      method: "GET",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("Authentication successful");
      return new Response(true, { status: 200 });
    } else {
      console.log("Authentication failed", response.statusText);
      return new Response(false, { status: 401 });
    }
  } catch (error) {
    console.error(`Error during authentication: ${error.message}`);
    return new Response(false, { status: 500 });
  }
};
