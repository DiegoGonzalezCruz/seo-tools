-- CreateTable
CREATE TABLE "OpenAIInstance" (
    "id" SERIAL NOT NULL,
    "apiKey" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "OpenAIInstance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OpenAIInstance" ADD CONSTRAINT "OpenAIInstance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
