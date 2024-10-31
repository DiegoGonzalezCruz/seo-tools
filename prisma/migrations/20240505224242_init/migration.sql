-- CreateTable
CREATE TABLE "WordPressInstance" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "appPassword" VARCHAR(500) NOT NULL,

    CONSTRAINT "WordPressInstance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaItem" (
    "id" SERIAL NOT NULL,
    "wordpressInstanceId" INTEGER NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "altTag" TEXT,

    CONSTRAINT "MediaItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MediaItem" ADD CONSTRAINT "MediaItem_wordpressInstanceId_fkey" FOREIGN KEY ("wordpressInstanceId") REFERENCES "WordPressInstance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
