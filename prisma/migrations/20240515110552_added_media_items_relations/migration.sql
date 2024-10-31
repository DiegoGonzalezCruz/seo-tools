-- DropIndex
DROP INDEX "WordPressInstance_userId_key";

-- AlterTable
ALTER TABLE "WordPressInstance" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "WordPressInstance" ADD CONSTRAINT "WordPressInstance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
