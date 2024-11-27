/*
  Warnings:

  - A unique constraint covering the columns `[userId,audiobookId]` on the table `Feedback` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Feedback_audiobookId_key";

-- DropIndex
DROP INDEX "Feedback_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Feedback_userId_audiobookId_key" ON "Feedback"("userId", "audiobookId");
