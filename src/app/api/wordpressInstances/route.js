import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const POST = async (req, res) => {
  try {
    const body = await req.json();

    const { wpSiteURL, wpPassword, userId, wpUsername, isActive } = body;

    // console.log(wpSiteURL, 'wp site url body 🔥🔥🔥🔥')
    // console.log(wpPassword, 'wp password body 🔥🔥🔥🔥')
    // console.log(userId, 'userId body 🔥🔥🔥🔥')
    // console.log(wpUsername, 'wp username body 🔥🔥🔥🔥')

    if (
      !wpSiteURL ||
      wpSiteURL === "" ||
      !wpPassword ||
      wpPassword === "" ||
      !userId ||
      userId === "" ||
      !wpUsername ||
      wpUsername === ""
    ) {
      return Response.json(
        { error: "Invalid request: All fields are required" },
        { status: 400 }
      );
    }

    // Check if the WordPress instance already exists
    const existingInstance = await prisma.wordPressInstance.findFirst({
      where: {
        url: wpSiteURL,
        userId: userId,
      },
    });

    let wordpressInstance;
    if (existingInstance) {
      // Update the existing instance
      wordpressInstance = await prisma.wordPressInstance.update({
        where: {
          id: existingInstance.id,
        },
        data: {
          appPassword: wpPassword,
          appUsername: wpUsername,
          isActive: isActive ?? existingInstance.isActive,
        },
      });
    } else {
      // Create a new instance
      wordpressInstance = await prisma.wordPressInstance.create({
        data: {
          url: wpSiteURL,
          appPassword: wpPassword,
          appUsername: wpUsername,
          isActive: isActive ?? false,
          user: {
            connect: { id: userId },
          },
        },
      });
    }

    // console.log(wordpressInstance, 'wordpressInstance saved')

    return Response.json(
      { message: "Configuration saved", wordpressInstance },
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
    const { userId } = req.query;

    if (!userId) {
      return Response.json({ error: "User ID is required" }, { status: 400 });
    }

    const wordpressInstances = await prisma.wordPressInstance.findMany({
      where: { userId },
    });

    return Response.json({ wordpressInstances, status: 200 });
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
    const {
      wpSiteURL,
      wpPassword,
      userId,
      wpUsername,
      isActive,
      ...otherFields
    } = body;
    console.log(
      wpSiteURL,
      wpPassword,
      userId,
      wpUsername,
      isActive,
      otherFields,
      "body PUT request 🔥🔥🔥🔥"
    );

    if (!wpSiteURL || !wpPassword || !userId || !wpUsername) {
      return Response.json({ error: "All fields are required", status: 400 });
    }

    const existingInstance = await prisma.wordPressInstance.findFirst({
      where: {
        url: wpSiteURL,
        userId: userId,
      },
    });

    let wordpressInstance;
    if (existingInstance) {
      console.log("Instance already exists:", existingInstance, "🔥🔥🔥🔥");
      // If setting as active, make sure to set all other instances for this user as inactive
      if (isActive) {
        console.log(`Setting other instances for user ${userId} as inactive`);

        await prisma.wordPressInstance.updateMany({
          where: { userId: userId },
          data: { isActive: false },
        });
      }
      wordpressInstance = await prisma.wordPressInstance.update({
        where: {
          id: existingInstance.id,
        },
        data: {
          appPassword: wpPassword,
          appUsername: wpUsername,
          isActive: isActive ?? existingInstance.isActive,
          ...otherFields,
        },
      });
      console.log("Instance updated:", wordpressInstance, "🔥🔥🔥🔥");
    } else {
      // If setting as active, make sure to set all other instances for this user as inactive
      if (isActive) {
        await prisma.wordPressInstance.updateMany({
          where: { userId: userId },
          data: { isActive: false },
        });
      }
      wordpressInstance = await prisma.wordPressInstance.create({
        data: {
          url: wpSiteURL,
          appPassword: wpPassword,
          appUsername: wpUsername,
          user: {
            connect: { id: userId },
          },
          isActive: isActive ?? false,
          ...otherFields,
        },
      });
    }

    return Response.json(
      { message: "Configuration saved", wordpressInstance },
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
    const { wpSiteURL, userId } = await req.json();

    if (!wpSiteURL || !userId) {
      return Response(
        JSON.stringify({ error: "URL and User ID are required" }),
        { status: 400 }
      );
    }

    const wordpressInstance = await prisma.wordPressInstance.findFirst({
      where: {
        url: wpSiteURL,
        userId: userId,
      },
    });

    if (!wordpressInstance) {
      return Response(JSON.stringify({ error: "Instance not found" }), {
        status: 404,
      });
    }

    await prisma.wordPressInstance.delete({
      where: {
        id: wordpressInstance.id,
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
