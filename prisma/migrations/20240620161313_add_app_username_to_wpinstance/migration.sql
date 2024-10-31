/*
  Warnings:

  - You are about to alter the column `appUsername` on the `WordPressInstance` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(500)`.

*/
-- AlterTable
ALTER TABLE "WordPressInstance" ALTER COLUMN "appUsername" SET DATA TYPE VARCHAR(500);
