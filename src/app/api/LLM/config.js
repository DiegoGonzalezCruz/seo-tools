"use server";

import prisma from "@/lib/prisma";

export const activateLLM = async (llmName, user) => {
  // Implement the logic to activate the specified LLM

  console.log(`Activating ${llmName} - ${user}`);

  try {
    const res = await prisma.user.update({
      where: { id: user.id },
      data: { activeLLM: llmName },
    });
    console.log(res, "res *****");
    return res;
  } catch (error) {
    console.error("Error activating LLM:", error);
    throw new Error("Failed to activate LLM");
  }
};
