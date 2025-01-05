export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const apiKey = searchParams.get("apiKey");

  if (!apiKey) {
    return Response.json(
      { valid: false, message: "API key is missing" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch("https://api.openai.com/v1/models", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    // console.log(response, "RESPONSE");
    if (!response.ok) {
      // console.log("NOT VALID");
      return Response.json({
        valid: false,
        message: "Invalid API key or insufficient permissions",
      });
    }

    return Response.json({ valid: true });
  } catch (error) {
    return Response.json({
      valid: false,
      message: "Failed to validate API key. Please try again.",
    });
  }
};
