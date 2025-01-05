import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const POST = async (req, res) => {
  console.log("POST request received");
  try {
    const body = await req.json();

    const { openAIAPIKey, userId } = body;
    console.log("openAIAPIKey:", openAIAPIKey);
    console.log("userId:", userId);

    if (!userId || userId === "" || !openAIAPIKey || openAIAPIKey === "") {
      return Response.json(
        { error: "Invalid request: All fields are required" },
        { status: 400 }
      );
    }
    console.log("Creating or updating OpenAI instance");
    // Check if the API key already exists for the user
    const existingInstance = await prisma.openAIInstance.findFirst({
      where: {
        apiKey: openAIAPIKey,
        userId: userId,
      },
    });
    console.log("Existing instance:", existingInstance);

    let openAIInstance;
    if (existingInstance) {
      // Update the existing instance
      console.log("Updating existing instance");
      openAIInstance = await prisma.openAIInstance.update({
        where: {
          id: existingInstance.id,
        },
        data: {
          isActive: true,
        },
      });
    } else {
      // Deactivate all instances before creating a new one
      await prisma.openAIInstance.updateMany({
        where: { userId: userId },
        data: { isActive: false },
      });

      openAIInstance = await prisma.openAIInstance.create({
        data: {
          apiKey: openAIAPIKey,
          isActive: true,
          user: {
            connect: { id: userId },
          },
        },
      });
    }
    console.log("OpenAI instance created:", openAIInstance);

    return Response.json(
      { message: "Configuration saved", openAIInstance },
      { status: 200 }
    );
  } catch (error) {
    console.error("Request error", error);
    return Response.json(
      { error: `Error saving configuration: ${error.message}` },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};

export const GET = async (req, res) => {
  try {
    console.log("GET request WP received");

    const userId = req.nextUrl.searchParams.get("userId"); // Extract 'userId' query parameter
    // console.log(userId, "userId GET request 🔥🔥🔥🔥");
    if (!userId) {
      return Response.json({ error: "User ID is required" }, { status: 400 });
    }
    const openAIInstances = await prisma.openAIInstance.findMany({
      where: { userId },
    });
    // console.log(openAIInstances, "openAIInstances GET request 🔥🔥🔥🔥");
    return Response.json({ openAIInstances, status: 200 });
  } catch (error) {
    console.error("Request error", error);
    return res
      .status(500)
      .json({ error: `Error fetching configurations: ${error.message}` });
  } finally {
    await prisma.$disconnect();
  }
};

export const PUT = async (req, res) => {
  console.log("PUT request received");
  try {
    const body = await req.json();
    const { openAIAPIKey, userId, isActive, ...otherFields } = body;
    console.log(
      openAIAPIKey,
      userId,
      isActive,
      otherFields,
      "body PUT request 🔥🔥🔥🔥"
    );

    if (!openAIAPIKey || !userId) {
      return Response.json({ error: "All fields are required", status: 400 });
    }

    const existingInstance = await prisma.openAIInstance.findFirst({
      where: {
        apiKey: openAIAPIKey,
        userId: userId,
      },
    });

    let openAIInstance;
    if (existingInstance) {
      console.log(
        "OpenAI Instance already exists:",
        existingInstance,
        "🔥🔥🔥🔥"
      );
      // If setting as active, make sure to set all other instances for this user as inactive
      if (isActive) {
        console.log(`Setting other instances for user ${userId} as inactive`);

        await prisma.openAIInstance.updateMany({
          where: { userId: userId },
          data: { isActive: false },
        });
      }
      openAIInstance = await prisma.openAIInstance.update({
        where: {
          id: existingInstance.id,
        },
        data: {
          apiKey: openAIAPIKey,
          isActive: isActive ?? existingInstance.isActive,
          ...otherFields,
        },
      });
      console.log("Instance updated:", openAIInstance, "🔥🔥🔥🔥");
    } else {
      // If setting as active, make sure to set all other instances for this user as inactive
      if (isActive) {
        await prisma.openAIInstance.updateMany({
          where: { userId: userId },
          data: { isActive: false },
        });
      }
      openAIInstance = await prisma.openAIInstance.create({
        data: {
          apiKey: openAIAPIKey,
          user: {
            connect: { id: userId },
          },
          isActive: isActive ?? false,
          ...otherFields,
        },
      });
    }

    return Response.json(
      { message: "Configuration saved", openAIInstance },
      { status: 200 }
    );
  } catch (error) {
    console.error("Request error", error);
    return Response.json(
      { error: `Error saving configuration: ${error.message}` },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};

export const DELETE = async (req, res) => {
  try {
    const { openAIAPIKey, userId } = await req.json();

    if (!openAIAPIKey || !userId) {
      return Response(
        JSON.stringify({ error: "URL and User ID are required" }),
        { status: 400 }
      );
    }

    const openAIInstance = await prisma.openAIInstance.findFirst({
      where: {
        apiKey: openAIAPIKey,
        userId: userId,
      },
    });

    if (!openAIInstance) {
      return Response(JSON.stringify({ error: "Instance not found" }), {
        status: 404,
      });
    }

    await prisma.openAIInstance.delete({
      where: {
        id: openAIInstance.id,
      },
    });

    return Response(
      JSON.stringify({ message: "Instance deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Request error", error);
    return Response(
      JSON.stringify({ error: `Error deleting instance: ${error.message}` }),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
